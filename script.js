const coffees = [
  {
    name: "Espresso",
    country: "Itália",
    region: "Europa",
    history:
      "Criado no início do século XX com a popularização das máquinas de extração rápida, tornou-se base para inúmeras bebidas modernas.",
    composition: ["Café moído fino", "Água sob alta pressão (9 bar)", "Extração de 25 a 30 segundos"],
    whereToFind:
      "Cafeterias italianas, bares de bairro em Roma, Milão e Nápoles; presente globalmente em coffee shops especializados.",
  },
  {
    name: "Café Turco",
    country: "Turquia",
    region: "Oriente Médio",
    history:
      "Uma das formas mais antigas de preparo, difundida durante o Império Otomano, com tradição social e ritualística forte.",
    composition: ["Café extremamente fino", "Água", "Opcional: açúcar e cardamomo", "Preparo em cezve/ibrik"],
    whereToFind:
      "Cafés tradicionais em Istambul, mercados históricos e casas de chá no Oriente Médio e Balcãs.",
  },
  {
    name: "Café de Olla",
    country: "México",
    region: "América Latina",
    history:
      "Popularizado no período revolucionário mexicano, era preparado em panelas de barro para soldados e comunidades rurais.",
    composition: ["Café coado", "Canela", "Piloncillo (açúcar de cana não refinado)", "Água"],
    whereToFind:
      "Mercados e cafeterias mexicanas tradicionais, sobretudo em estados como Oaxaca e Jalisco.",
  },
  {
    name: "Flat White",
    country: "Austrália/Nova Zelândia",
    region: "Oceania",
    history:
      "Surgiu na cultura de cafés da Oceania como resposta a bebidas com espuma alta, priorizando textura cremosa e equilíbrio.",
    composition: ["Dose dupla de espresso", "Leite vaporizado com microespuma fina"],
    whereToFind:
      "Cafeterias de especialidade em Sydney, Melbourne, Auckland e redes internacionais.",
  },
  {
    name: "Qahwa Árabe",
    country: "Arábia Saudita",
    region: "Oriente Médio",
    history:
      "Símbolo de hospitalidade árabe, servido em ocasiões familiares e cerimônias culturais há séculos.",
    composition: ["Café claro torrado", "Água", "Cardamomo", "Opcional: açafrão e cravo"],
    whereToFind:
      "Majlis tradicionais, casas locais e festivais culturais em países do Golfo.",
  },
  {
    name: "Café Filtrado Etíope (Bunna)",
    country: "Etiópia",
    region: "África",
    history:
      "Ligado à origem histórica do café e à cerimônia etíope do Bunna, em que o preparo é um momento coletivo.",
    composition: ["Grãos arábica etíopes", "Torra artesanal", "Infusão em jebena"],
    whereToFind:
      "Cerimônias familiares, casas de café em Adis Abeba e comunidades etíopes ao redor do mundo.",
  },
  {
    name: "Cà Phê Sữa Đá",
    country: "Vietnã",
    region: "Ásia",
    history:
      "Desenvolvido na era colonial francesa, adaptando-se ao uso de leite condensado em clima tropical e escassez de leite fresco.",
    composition: ["Café robusta forte", "Leite condensado", "Gelo", "Filtro phin"],
    whereToFind:
      "Cafeterias de rua em Hanói e Ho Chi Minh, além de casas vietnamitas em grandes metrópoles.",
  },
];

const regionFilter = document.querySelector("#region-filter");
const coffeeGrid = document.querySelector("#coffee-grid");
const template = document.querySelector("#coffee-card-template");

const createRegionOptions = () => {
  const regions = [...new Set(coffees.map((coffee) => coffee.region))].sort();

  regions.forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.append(option);
  });
};

const renderCoffees = (selectedRegion) => {
  const filteredCoffees =
    selectedRegion === "todos"
      ? coffees
      : coffees.filter((coffee) => coffee.region === selectedRegion);

  coffeeGrid.innerHTML = "";

  if (!filteredCoffees.length) {
    coffeeGrid.innerHTML = `<p>Nenhum café encontrado para essa região.</p>`;
    return;
  }

  filteredCoffees.forEach((coffee) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".coffee-card__meta").textContent = `${coffee.country} • ${coffee.region}`;
    clone.querySelector(".coffee-card__title").textContent = coffee.name;
    clone.querySelector(".coffee-card__history").textContent = coffee.history;

    const compositionList = clone.querySelector(".coffee-card__composition");
    coffee.composition.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      compositionList.append(li);
    });

    clone.querySelector(".coffee-card__where").textContent = coffee.whereToFind;

    coffeeGrid.append(clone);
  });
};

regionFilter.addEventListener("change", (event) => {
  renderCoffees(event.target.value);
});

createRegionOptions();
renderCoffees("todos");
