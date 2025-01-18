import prisma from "../config/prisma";

async function deleteToken() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("❌ Erro: Você deve informar o ID do token para remover.");
    console.log('📌 Uso: npm run remover:token "id_do_token"');
    process.exit(1);
  }

  const tokenId = args[0];

  try {
    const deletedToken = await prisma.token.delete({
      where: { id: tokenId },
    });

    console.log(`✅ Token removido com sucesso!`);
    console.log(`👤 Desenvolvedor: ${deletedToken.developer}`);
    console.log(`🔑 Token Hash: ${deletedToken.token}`);
  } catch (error) {
    console.error("❌ Erro ao remover token:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteToken();
