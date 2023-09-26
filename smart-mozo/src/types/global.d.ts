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
    ingridients: Ingridient[]
    
  }

  interface Ingridient {
    id: number;
    restaurant_id: number;
    ingridient: string;
    amount: number;
  }

  interface MenuItem {
    id: number;
    restaurant_id: number;
    plate: string;
    description: string;
    category: string;
    price: number;
    img: string;
  }

  interface Waiter {
    id: number;
    restaurant_id: number;
    name: string;
    email: string;
    tables: Table[];
  }

  interface Cook {
    id: number;
    restaurant_id: number;
    name: string;
  }

  interface Table {
    id: number;
    number: number;
    restaurant_id: number;
  }

  interface Order {
    id: number;
    restaurant_id: number;
    table_id: number;
    name: string;
    status: string;
    items: MenuItem[];
    notes: string;
  }

}
