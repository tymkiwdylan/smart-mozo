import 'redux-thunk/extend-redux';
export {};

declare global {

    
  interface Restaurant {
    id: number;
    restaurant_name: string;
    menu: MenuItem[];
    waiters: Waiter[];
    cooks: Cook[];
    tables: Table[];
    
  }

  interface MenuItem {
    id: number;
    plateName: string;
    description: string;
    price: number;
    image: string;
  }

  interface Waiter {
    id: number;
    name: string;
    email: string;
  }

  interface Cook {
    id: number;
    name: string;
  }

  interface Table {
    id: number;
  }

}
