const initState = {
  recipes: [],
  wines: [],
  products: [],
  sigleRecipe: null,
  singleProduct: null,
  minimizeSearchBy: false,
  favourite: { recipes: [], wines: [], products: [] },
  error: false,
  searchingRecipe: false,
  searchingProduct: false,

  searchingWine: false,
};
const rootReducer = (state = initState, action) => {
  if (action.type === "ADD_RECIPE_LIST_SEARCH") {
    let newRecipes = state.recipes;
    newRecipes = action.data;
    return {
      ...state,
      recipes: newRecipes,
      error: false,
    };
  }
  if (action.type === "ADD_WINE_LIST_SEARCH") {
    let newWines = state.wines;
    newWines = action.data;
    return {
      ...state,
      wines: newWines,
      error: false,
    };
  }

  if (action.type === "ADD_PRODUCTS_LIST_SEARCH") {
    let newProducts = state.products;
    newProducts = action.data;
    return {
      ...state,
      products: newProducts,
      error: false,
    };
  }

  if (action.type === "ADD_SINGLE_RECIPE") {
    let newRecipe = state.singleRecipe;
    newRecipe = action.data;
    return {
      ...state,
      sigleRecipe: newRecipe,
    };
  }
  if (action.type === "ADD_SINGLE_PRODUCT") {
    let newProduct = state.singleProduct;
    newProduct = action.data;
    return {
      ...state,
      singleProduct: newProduct,
    };
  }

  if (action.type === "ADD_WINES_TO_FAVOURITE") {
    let favourite = state.favourite;
    const index = favourite.wines.findIndex(
      (e) => e.title === action.data.title
    );
    if (favourite.wines.length !== 0) {
      if (index === -1) {
        favourite.wines.push(action.data);
      }
    } else {
      favourite.wines.push(action.data);
    }

    return {
      ...state,
      favourite: favourite,
    };
  }
  if (action.type === "ADD_RECIPES_TO_FAVOURITE") {
    let favourite = state.favourite;
    console.log("id", action.data.id);
    const index = favourite.recipes.findIndex((e) => e.id === action.data.id);
    if (favourite.recipes.length !== 0) {
      if (index === -1) {
        favourite.recipes.push(action.data);
      }
    } else {
      favourite.recipes.push(action.data);
    }

    return {
      ...state,
      favourite: favourite,
    };
  }

  if (action.type === "ADD_PRODUCTS_TO_FAVOURITE") {
    let favourite = state.favourite;
    console.log("id", action.data.id);
    const index = favourite.products.findIndex((e) => e.id === action.data.id);
    if (favourite.products.length !== 0) {
      if (index === -1) {
        favourite.products.push(action.data);
      }
    } else {
      favourite.products.push(action.data);
    }

    return {
      ...state,
      favourite: favourite,
    };
  }

  if (action.type === "REMOVE_RECIPE_FROM_FAV") {
    console.log("working there");
    console.log(action.data);

    let favourite = state.favourite;
    const cloneRecipes = [...favourite.recipes];
    cloneRecipes.splice(action.data, 1);

    return {
      ...state,
      favourite: {
        ...state.favourite,
        recipes: cloneRecipes,
      },
    };
  }

  if (action.type === "REMOVE_WINE_FROM_FAV") {
    console.log("working there");
    console.log(action.data);

    let favourite = state.favourite;
    const cloneWines = [...favourite.wines];
    cloneWines.splice(action.data, 1);

    return {
      ...state,
      favourite: {
        ...state.favourite,
        wines: cloneWines,
      },
    };
  }

  if (action.type === "REMOVE_PRODUCT_FROM_FAV") {
    console.log("working there");
    console.log(action.data);

    let favourite = state.favourite;
    const cloneProducts = [...favourite.products];
    cloneProducts.splice(action.data, 1);

    return {
      ...state,
      favourite: {
        ...state.favourite,
        products: cloneProducts,
      },
    };
  }

  if (action.type === "MINIMIZE_SEARCH_BY") {
    return {
      ...state,
      minimizeSearchBy: action.data,
    };
  }
  if (action.type === "ERR_RECIPE_LIST") {
    return {
      ...state,
      error: action.data,
    };
  }

  if (action.type === "SEARCHING_RECIPE") {
    return {
      ...state,
      searchingRecipe: action.data,
    };
  }
  if (action.type === "SEARCHING_PRODUCT") {
    return {
      ...state,
      searchingProduct: action.data,
    };
  }
  if (action.type === "SEARCHING_WINE") {
    return {
      ...state,
      searchingWine: action.data,
    };
  }
  return state;
};

export default rootReducer;
