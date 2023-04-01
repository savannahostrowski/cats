export interface Cat {
  id: number;
  image: string;
  name: string;
  type: string;
  age: number;
  funfact: string;
  average_rating: number;
}

export interface Cats{
  cats: [Cat] | [];
}