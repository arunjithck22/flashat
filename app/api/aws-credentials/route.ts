import { getAwsCredentials } from "@/actions/actions";
import { NextResponse } from "next/server";

// Type for the response data
// interface AwsCredentialsResponse {
//   credentials: any; // Replace 'any' with the specific type of your credentials if available
// }

// Handler for the GET request
export async function GET(): Promise<NextResponse> {
  try {
    const credentials = await getAwsCredentials();
    console.log("aws cred11", credentials);

    return NextResponse.json({
      credentials: credentials,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({});
  }
}
