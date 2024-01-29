import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const section1 = { id: "s01", name: "s01" }
const section2 = { id: "s02", name: "s02" }
const section3 = { id: "s03", name: "s03" }

const productionStepExecutions = [
  // pse 1
  {
    recipe: { id: "r01", name: "r01", sections: [section1, section3] },
    productionStep: "r01-step01", 
    productionItems: [
      { id: "pi1", name: "pi1" }
    ],
    section: section1,
    productionDate: "25/01/24",
    isSectionLastStep: true,
  },
  // pse 2
  {
    recipe: { id: "r02", name: "r02", sections: [section2] },
    productionStep: "r02-step01",
    productionItems: [
      { id: "pi2", name: "pi2" },
      { id: "pi3", name: "pi3" },
    ],
    section: section2,
    productionDate: "25/01/24",
    isSectionLastStep: true,
  },
  // pse 3
  {
    recipe: { id: "r01", name: "r01", sections: [section1, section3] },
    productionStep: "r01-step02",    
    productionItems: [
      { id: "pi1", name: "pi1" }
    ],
    section: section3,
    productionDate: "25/01/24",
  },
    // pse 4
    {
      recipe: { id: "r01", name: "r01", sections: [section1, section3] },
      productionStep: "r01-step03",          
      productionItems: [
        { id: "pi1", name: "pi1" }
      ],
      section: section3,
      productionDate: "25/01/24",
      isSectionLastStep: true,
    },
]

const groupPSEByRecipe = (productionDate) => {
	const pses = productionStepExecutions.filter(pse => pse.productionDate === productionDate)

	const recipeMap = new Map()
	for (const pse of pses) {
		const prevPSEs = recipeMap.get(pse.recipe.id) || []

		recipeMap.set(pse.recipe.id, [...prevPSEs, pse])
  }
  return recipeMap
}
// const recipesMap = groupPSEByRecipe('25/01/24')

const createPE = () => {
  const recipesMap = groupPSEByRecipe('25/01/24')
  const packagings = []
  for (const pses of Object.values(Object.fromEntries(recipesMap))) {
    const recipe = pses[0].recipe;
    const productionItems = pses[0].productionItems;
    const productionDate = pses[0].productionDate;
    // console.log("key", key)
    packagings.push({
      recipe,
      tempPses: pses,
      productionItems,
      sections: recipe.sections.map(section => ({
        section,
        productionExecution: pses.find(p => p.section.id === section.id && p.isSectionLastStep)?.productionStep
      })),
      productionDate
    })
  }

  return packagings
}

// console.log("pses", Object.fromEntries(pses))
console.log("pses", createPE())
export default function TextButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button>Primary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
    </Stack>
  );
}
