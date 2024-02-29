import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'This is simply a test',
  //     'https://www.recipesfromeurope.com/wp-content/uploads/2021/01/german-schnitzel-on-plate.jpg',
  //     [new Ingredient('Meat', 25), new Ingredient('FF', 5)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say',
  //     'https://www.allrecipes.com/thmb/RTo6ddljby-5lAszPdMRwQ-aVh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19863best-burger-everFranceC4x3-c9c7d5cae40b4a58a110a33e04b531d1.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 25)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
