import prisma from "@/lib/prisma";
import { obtainCompanyInfo } from "@/utils/company";
import { NextResponse } from "next/server";

interface CompanyDetailsResponse {
  id: number;
  name: string;
  logo_path: string;
}

async function fetchCompanyDetailsWithRetry(
  companyId: string,
  retries = 3,
  delay = 60000
): Promise<CompanyDetailsResponse> {
  try {
    return await obtainCompanyInfo(companyId);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("429") &&
      retries > 0
    ) {
      console.error(
        `Rate limit atteint pour ${companyId}, attente de ${
          delay / 1000
        } secondes...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchCompanyDetailsWithRetry(companyId, retries - 1, delay);
    }
    throw error;
  }
}

export async function GET() {
  try {
    // const batchSize = 10;
    // const delayBetweenBatches = 2000;
    // const updatedCompanies: Array<{
    //   id: number;
    //   name: string;
    //   logo_path: string;
    // }> = [];

    // const companies = await prisma.productionCompany.findMany({
    //   where: {
    //     movies: {
    //       some: {
    //         watched: {
    //           some: {
    //             userId: "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07",
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // for (let i = 0; i < companies.length; i += batchSize) {
    //   const batch = companies.slice(i, i + batchSize);
    //   const batchResults: (CompanyDetailsResponse | null)[] = [];

    //   for (const companyItem of batch) {
    //     try {
    //       const result = await fetchCompanyDetailsWithRetry(
    //         String(companyItem.id)
    //       );
    //       batchResults.push(result);
    //     } catch (error) {
    //       console.error(
    //         `Échec définitif pour le film ${companyItem.id}:`,
    //         error instanceof Error ? error.message : error
    //       );
    //       batchResults.push(null);
    //     }
    //   }

    //   for (const result of batchResults) {
    //     if (!result) continue;

    //     await prisma.productionCompany.upsert({
    //       where: {
    //         id: result.id,
    //       },
    //       create: {
    //         id: result.id,
    //         name: result.name,
    //         logo_path: result.logo_path || "",
    //       },
    //       update: {
    //         id: result.id,
    //         name: result.name,
    //         logo_path: result.logo_path || "",
    //       },
    //     });

    //     updatedCompanies.push({
    //       id: result.id,
    //       name: result.name,
    //       logo_path: result.logo_path,
    //     });
    //   }

    //   if (i + batchSize < companies.length) {
    //     await new Promise((resolve) =>
    //       setTimeout(resolve, delayBetweenBatches)
    //     );
    //   }
    // }

    // return NextResponse.json(updatedCompanies);
    return NextResponse.json("no");
  } catch (error: unknown) {
    console.error(
      "Erreur globale:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: "ERROR" });
  }
}
