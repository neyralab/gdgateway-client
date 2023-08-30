import { downloadChunk, countChunks, decryptChunk } from "../index";

import { hasWindow } from "../utils/hasWindow";
import { joinChunks } from "../utils/joinChunks";

import { IDownloadFile } from "../types";

export const downloadFile = async ({
  file,
  oneTimeToken,
  signal,
  endpoint,
  isEncrypted,
  key,
  callback,
  handlers,
}: IDownloadFile) => {
  const chunks = [];
  let fileStream = null;

  const { entry_clientside_key, slug } = file;

  const sha3 = !isEncrypted
    ? null
    : entry_clientside_key?.clientsideKeySha3Hash ||
      entry_clientside_key?.sha3_hash;

  const chunkCountResponse = await countChunks({
    endpoint,
    oneTimeToken,
    slug,
    signal,
  });

  if (!chunkCountResponse.ok) {
    throw new Error(`HTTP error! status:${chunkCountResponse.status}`);
  }

  const res = await chunkCountResponse.json();

  const { count } = res;

  if (!hasWindow()) {
    const { Readable } = require("stream");
    fileStream = new Readable({
      read() {},
    });
  }

  for (let index = 0; index < count; index++) {
    let chunk;
    const downloadedChunk = await downloadChunk({
      index,
      sha3_hash: sha3,
      slug,
      oneTimeToken,
      signal,
      endpoint,
    });

    if (!isEncrypted) {
      chunk = downloadedChunk;
    } else {
      chunk = await decryptChunk({
        chunk: downloadedChunk,
        iv: entry_clientside_key?.iv,
        key,
      });
      if (chunk?.failed) {
        return { failed: true };
      }
      if (index === 0 && chunk) {
        handlers.includes("onSuccess") &&
          callback({
            type: "onSuccess",
            params: {},
          });
      }
    }
    if (fileStream) {
      fileStream.push(new Uint8Array(chunk));
    } else {
      chunks.push(chunk);
    }
  }

  if (fileStream) {
    fileStream.push(null);
    return fileStream;
  } else {
    const file = joinChunks(chunks);
    return file;
  }
};
