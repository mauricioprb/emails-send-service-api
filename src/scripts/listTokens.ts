import prisma from "../config/prisma";

async function listTokens() {
  try {
    const tokens = await prisma.token.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (tokens.length === 0) {
      console.log("[⚠️] Nenhum token encontrado.");
    } else {
      console.log(`[🔑] Lista de Tokens:\n`);
      tokens.forEach((token) => {
        console.log(`[🆔] ID: ${token.id}`);
        console.log(`[👤] Desenvolvedor: ${token.developer}`);
        console.log(`[🔑] Token Hash: ${token.token}`);
        console.log(`[📅] Criado em: ${token.createdAt}`);
        console.log(`\n--------------------------------------\n`);
      });
    }
  } catch (error) {
    console.error("[❌] Erro ao listar tokens: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

listTokens();
