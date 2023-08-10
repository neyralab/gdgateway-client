import { Crypto } from "@peculiar/webcrypto";
import * as Base64 from "base64-js";

import { convertArrayBufferToBase64 } from "../utils/convertArrayBufferToBase64";
import { decryptChunk } from "./index";
import { encryptChunk } from "../encryptChunk";

const crypto = !window || !window.crypto?.subtle ? new Crypto() : window.crypto;

describe("decryptChunk", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should decrypt already encrypted chunk successfully", async () => {
    const mockChunk = new ArrayBuffer(16);
    const mockIv = crypto.getRandomValues(new Uint8Array(12));

    const mockKey = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"]
    );

    // @ts-ignore
    window.key = mockKey;

    const encryptedChunk = await encryptChunk(mockChunk, mockIv);
    // @ts-ignore
    const buffer = await crypto.subtle.exportKey("raw", window.key);
    const keyBase64 = convertArrayBufferToBase64(buffer);
    const base64iv = Base64.fromByteArray(mockIv);

    const decryptedChunk = await decryptChunk(
      encryptedChunk,
      base64iv,
      keyBase64
    );

    expect(decryptedChunk).toEqual(mockChunk);
  });
});