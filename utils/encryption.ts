export async function encryptAES(message: string, keyString: string | undefined): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Convert IV (Initialization Vector) and key to Uint8Array
  const iv = new Uint8Array([73, 97, 116, 82, 114, 110, 101, 99, 110, 86, 105, 111, 116, 100, 111, 109]); // "iatRrnecnViotdom"
  const keyBuffer = encoder.encode(keyString);

  // Ensure the key is exactly 32 bytes for AES-256
  if (keyBuffer.length !== 32) {
      throw new Error("Encryption key must be exactly 32 characters long.");
  }

  // Import AES encryption key
  const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
  );

  // Encrypt the data
  const encrypted = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      data
  );

  // Convert encrypted data to Base64
  const encryptedArray = new Uint8Array(encrypted);
  const encryptedBase64 = btoa(String.fromCharCode(...Array.from(encryptedArray)));

  return encryptedBase64;
}
