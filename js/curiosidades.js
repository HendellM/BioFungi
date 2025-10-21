document.addEventListener("DOMContentLoaded", () => {
  const curiosidades = [
    "Os fungos são mais próximos dos animais do que das plantas.",
    "Existem fungos que brilham no escuro!",
    "Alguns fungos podem viver dentro de vulcões.",
    "O maior organismo vivo do mundo é um fungo que cobre 10 km² nos EUA.",
    "Alguns fungos produzem antibióticos naturais, como a penicilina.",
    "Os fungos possuem substâncias químicas em suas paredes celulares compartilhadas com lagostas e caranguejos.",

"Foi descoberto um fungo capaz de decompor plásticos em semanas, em vez de anos.",

"Há evidências que sugerem que leveduras — um tipo de fungo — eram usadas para produzir a bebida alcoólica hidromel há 9 mil anos.",

"As peças de plástico para automóveis, a borracha sintética e o lego são feitos com ácido itacônico derivado de um fungo.",

"No total, 216 espécies de fungos são consideradas alucinógenas.",

"Fungos estão sendo usados para transformar resíduos de colheitas em bioetanol.",

"Produtos feitos a partir de fungos podem ser usados como substitutos para espuma de poliestireno, couro e materiais de construção.",

"Estudos genéticos mostram que existem milhares de fungos diferentes em uma única amostra de solo, muitos dos quais são desconhecidos e estão ocultos — os chamados dark taxa",

"Mais de 2 mil novos fungos são descobertos a cada ano, a partir de uma variedade de fontes, incluindo uma unha humana.",

"Alguns fungos têm a capacidade de transformar formigas em uma espécie de zumbi.",

"Os pés humanos abrigam quase 200 tipos de fungos.",

"Os cogumelos também são em grande parte responsáveis pela chuva nas florestas tropicais.",

"As leveduras são fungos microscópicos que fermentam açúcares. É graças a elas que o pão cresce e a cerveja borbulha.",

"Fungos decompõem folhas, troncos e bichos mortos. Sem eles, o planeta seria um lixão natural. Dá pra dizer que são os faxineiros do ecossistema.",

"A penicilina, o primeiro antibiótico da história, vem de um fungo do gênero Penicillium. Sem ele, muita gente nem estaria aqui hoje.",

"Do gelo da Antártida a florestas úmidas e até reatores radioativos. Os fungos são capazes de viver em todo tipo de lugar.",

"Sem fungos, não existiria queijo gorgonzola, shoyu, salame ou até molho de soja.",

"Fungos produzem enzimas, antibióticos e até biocombustíveis. Cientistas os usam em pesquisas pra criar remédios e materiais sustentáveis.",

"Alguns fungos formam redes subterrâneas de hifas que conectam árvores — tipo uma “internet da floresta”. Elas até trocam nutrientes e avisos.",

"Um único cogumelo pode lançar bilhões de esporos. Respiramos a maioria desses esporos o tempo todo."
  ];

  const curiosidadeText = document.getElementById("curiosidade-text");
  const botao = document.getElementById("gerarCuriosidade");

  botao.addEventListener("click", () => {
    const aleatoria = curiosidades[Math.floor(Math.random() * curiosidades.length)];
    curiosidadeText.textContent = aleatoria;
  });
});