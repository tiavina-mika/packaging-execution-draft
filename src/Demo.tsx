import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const section1 = { id: "s01", name: "s01" };
const section2 = { id: "s02", name: "s02" };
const section3 = { id: "s03", name: "s03" };

const productionStepExecutions = [
  // pse 1
  {
    recipe: { id: "r01", name: "r01", sections: [section1, section3] },
    productionStep: "r01-step01",
    productionItems: [{ id: "pi1", name: "pi1" }],
    section: section1,
    productionDate: "25/01/2024",
    isSectionLastStep: true
  },
  // pse 2
  {
    recipe: { id: "r02", name: "r02", sections: [section2] },
    productionStep: "r02-step01",
    productionItems: [
      { id: "pi2", name: "pi2" },
      { id: "pi3", name: "pi3" }
    ],
    section: section2,
    productionDate: "25/01/2024",
    isSectionLastStep: true
  },
  // pse 3
  {
    recipe: { id: "r01", name: "r01", sections: [section1, section3] },
    productionStep: "r01-step02",
    productionItems: [{ id: "pi1", name: "pi1" }],
    section: section3,
    productionDate: "25/01/2024"
  },
  // pse 4
  {
    recipe: { id: "r01", name: "r01", sections: [section1, section3] },
    productionStep: "r01-step03",
    productionItems: [{ id: "pi1", name: "pi1" }],
    section: section3,
    productionDate: "25/01/2024",
    isSectionLastStep: true
  }
];

// @ts-ignore
const groupPSEByRecipe = (productionDate) => {
  const filteredProductionExecutions = productionStepExecutions.filter(
    (productionStepExecution) =>
      productionStepExecution.productionDate === productionDate
  );

  const recipeMap = new Map();
  for (const productionExecution of filteredProductionExecutions) {
    const prevProductionStepExecutions =
      recipeMap.get(productionExecution.recipe.id) || [];

    recipeMap.set(productionExecution.recipe.id, [
      ...prevProductionStepExecutions,
      productionExecution
    ]);
  }
  return recipeMap;
};

// @ts-ignore
const createPE = (productionDate) => {
  const recipesMap = groupPSEByRecipe(productionDate);
  const packagings = [];
  for (const day of [0, 1]) {
    for (const recipeProductionStepExecutions of Object.values(
      Object.fromEntries(recipesMap)
    )) {
      const recipe = recipeProductionStepExecutions[0].recipe;
      const productionItems = recipeProductionStepExecutions[0].productionItems;
      const productionDate = recipeProductionStepExecutions[0].productionDate;
      // console.log("key", key)
      packagings.push({
        recipe,
        tempPses: recipeProductionStepExecutions,
        productionItems,
        sections: recipe.sections.map((section) => ({
          section,
          productionExecution: recipeProductionStepExecutions.find(
            (p) => p.section.id === section.id && p.isSectionLastStep
          )?.productionStep
        })),
        productionDate,
        packaginDate: dayjs(productionDate)
          .utc()
          .add(day, "days")
          .startOf("day")
          .valueOf()
      });
    }
  }

  return packagings;
};

// console.log("pses", Object.fromEntries(pses))
const productionDate = dayjs(dayjs().subtract(4, "days").valueOf()).format(
  "DD/MM/YYYY"
);
const packagingExecutions = createPE(productionDate);
console.log(
  "packagingExecutions",
  packagingExecutions.map((p) => {
    return {
      ...p,
      recipe: p.recipe.name,
      packaginDate: dayjs(p.packaginDate).utc().format("DD/MM/YYYY HH:mm")
      // productionDate: p.producio
    };
  })
);

export default function TextButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button>Primary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
    </Stack>
  );
}
