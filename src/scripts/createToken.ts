import prisma from "../config/prisma";
import { generateBearerToken } from "../utils/generateToken";

async function createToken() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("[❌] Erro: Você deve informar o nome do desenvolvedor.");
    console.log('[📌] Uso: npm run criar:token "Nome do Desenvolvedor"');
    process.exit(1);
  }

  const developerName = args.join(" ");
  const { rawToken, hashedToken } = await generateBearerToken();

  try {
    await prisma.token.create({
      data: {
        developer: developerName,
        token: hashedToken,
      },
    });

    console.log("[✅] Token gerado com sucesso!");
    console.log(`[👤] Desenvolvedor: ${developerName}`);
    console.log(`[🔑] Token para uso: Bearer ${rawToken}`);
    console.log("[⚠️] Guarde este token! Ele não poderá ser recuperado.");
  } catch (error) {
    console.error("[❌] Erro ao criar token:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createToken();
