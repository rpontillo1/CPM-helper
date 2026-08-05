export const sampleTasks = [
  {
    id: "A",
    name: "Buy Mozzarella Cheese",
    duration: 30,
    predecessors: [],
  },
  {
    id: "B",
    name: "Slice the Mozzarella Cheese",
    duration: 5,
    predecessors: ["A"],
  },
  {
    id: "C",
    name: "Beat Two Eggs",
    duration: 2,
    predecessors: [],
  },
  {
    id: "D",
    name: "Mix Eggs and Ricotta Cheese",
    duration: 3,
    predecessors: ["C"],
  },
  {
    id: "E",
    name: "Cut Onions and Mushrooms",
    duration: 7,
    predecessors: [],
  },
  {
    id: "F",
    name: "Cook the Tomato Sauce",
    duration: 25,
    predecessors: ["E"],
  },
  {
    id: "G",
    name: "Boil Large Quantity of Water",
    duration: 15,
    predecessors: [],
  },
  {
    id: "H",
    name: "Boil the Lasagna Noodles",
    duration: 10,
    predecessors: ["G"],
  },
  {
    id: "I",
    name: "Drain the Lasagna Noodles",
    duration: 2,
    predecessors: ["H"],
  },
  {
    id: "J",
    name: "Assemble All Ingredients",
    duration: 10,
    predecessors: ["B", "D", "F", "I"],
  },
  {
    id: "K",
    name: "Preheat the Oven",
    duration: 15,
    predecessors: [],
  },
  {
    id: "L",
    name: "Bake the Lasagna",
    duration: 30,
    predecessors: ["J", "K"],
  },
];