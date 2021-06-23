import uk_logo from "../Assets/login/UK_LOGO.svg";
import germany_logo from "../Assets/login/GERMANY_LOGO.svg";
import france_logo from "../Assets/login/FRANCE_LOGO.svg";
import spain_logo from "../Assets/login/SPAIN_LOGO.svg";

import address from "../Assets/login/icn_adress.svg";
import email from "../Assets/login/icn_email.svg";
import phone from "../Assets/login/icn_phone.svg";
import {INACTIVE, RESERVED, TABLE, TIME, CAPTAIN} from '../Assets/DineIn';
import {
    shrimp_logo,
    whiskey_logo,
    side_item_logo,
    chinese_noodle_logo,
    beer_logo,
    cocktails_logo,
    dessert_logo,
    dish_image,
    entree_logo,
    graph_image,
    mocktail_logo,
    rupee_image,
    salad_logo,
    three_dots_image,
    trash_image,
    wine_logo
} from '../Assets/AllItems';
import {
    overview,
    all_items_icon,
    combos_icon,
    customer_analytics_icon,
    dine_in_icon,
    employee_analytics_icon,
    favorites_icon,
    inventory_management_icon,
    logout_icon,
    online_order_icon,
    revenue_analytics_icon,
    reservation_icon
} from '../Assets/navigation';
import * as ROUTES from "./routes";
import {
    product_rating_1,
    product_rating_2,
    product_rating_3,
    product_rating_4,
    product_rating_5, total_orders
} from "../Assets/overview";

import {
    accounts_icon,
    category_icon,
    cogs_icon,
    dashboard_icon, food_surplus_icon,
    fridge_icon,
    inventoryItems_icon,
    menuItems_icon,
    order_icon, price_icon, shelfLife_icon,
    supplier_icon, units_icon,
    wastage_icon
} from '../Assets/Inventory';
import {
    barbecue_1_icon,
    barbecue_icon,
    beer_1_icon, beer_2_icon,
    boiled_egg_icon,
    burger_icon,
    cake_icon,
    canape_icon,
    chinese_icon,
    cocktail_1_icon,
    cocktail_icon,
    coconut_icon,
    coffee_icon,
    corndog_icon,
    cupcake_icon,
    doughnut_1_icon,
    doughnut_icon,
    fish_and_chips_icon,
    fish_icon,
    fruit_icon,
    honey_icon,
    hot_dog_icon,
    ice_cream_1_icon, ice_cream_2_icon, ice_cream_4_icon, ice_cream_5_icon,
    ice_cream_icon
} from "../Assets/AllItems/IconSet";
import {euro_icon} from "../Assets/Currency";

export const language = [
    {
        id: "0",
        name: "English",
        key: "location",
        logo: uk_logo,
    },
    {
        id: "1",
        name: "German",
        key: "location",
        logo: germany_logo,
    },
    {
        id: "2",
        name: "French",
        key: "location",
        logo: france_logo,
    },
    {
        id: "3",
        name: "Spanish",
        key: "location",
        logo: spain_logo,
    }
]

export const customerSupportData = [
    {
        id: '0',
        icon: address,
        title: "PANZEN",
        data: "328 Fisk City Rialto, OH - 81443"
    },
    {
        id: '1',
        icon: email,
        title: "EMAIL",
        data: "email@panzen.com"
    },
    {
        id: '2',
        icon: phone,
        title: "PHONE NUMBER",
        data: "0900 555 55 55"
    }
];

export const NavigationMenu = [
    {
        id: '0',
        branch: 'PARENT',
        routes: [
            {
                id: '0',
                path: ROUTES.OVERVIEW,
                title: 'Smart Overview',
                icon: overview
            },
            {
                id: '1',
                path: ROUTES.RESERVATION,
                title: 'Reservation',
                icon: reservation_icon
            }
        ]
    },
    {
        id: '1',
        branch: 'ORDERS',
        routes: [
            {
                id: '0',
                path: ROUTES.DINEIN,
                title: 'Dine In',
                icon: dine_in_icon
            },
            {
                id: '1',
                path: ROUTES.ONLINEORDER,
                title: 'Online Order',
                icon: online_order_icon
            }
        ]
    },
    {
        id: '2',
        branch: 'PRODUCTS',
        routes: [
            {
                id: '0',
                path: ROUTES.ALLITEMS,
                title: 'All Items',
                icon: all_items_icon
            },
            {
                id: '1',
                path: ROUTES.FAVORITES,
                title: 'Favorites',
                icon: favorites_icon
            },
            {
                id: '2',
                path: ROUTES.COMBOS,
                title: 'Combos',
                icon: combos_icon
            }
        ]
    },
    {
        id: '3',
        branch: 'INVENTORY',
        routes: [
            {
                id: '0',
                path: ROUTES.INVENTORY,
                title: 'Inventory Management',
                icon: inventory_management_icon
            }
        ]
    },
    {
        id: '4',
        branch: 'ANALYTICS',
        routes: [
            {
                id: '0',
                path: ROUTES.CUSTOMERANALYTICS,
                title: 'Customer Analytics',
                icon: customer_analytics_icon
            },
            {
                id: '1',
                path: ROUTES.EMPLOYEEANALYTICS,
                title: 'Employee Analytics',
                icon: employee_analytics_icon
            },
            {
                id: '2',
                path: ROUTES.REVENUEANALYTICS,
                title: 'Revenue Analytics',
                icon: revenue_analytics_icon
            }
        ]
    },
    {
        id: '5',
        branch: 'PARENT',
        routes: [
            {
                id: '0',
                path: ROUTES.LANDING,
                title: 'Log Out',
                icon: logout_icon
            }
        ]
    }
];

export const Months = [
    {
        id: 0,
        name: 'January'
    },
    {
        id: 1,
        name: 'February'
    },
    {
        id: 2,
        name: 'March'
    },
    {
        id: 3,
        name: 'April'
    },
    {
        id: 4,
        name: 'May'
    },
    {
        id: 5,
        name: 'June'
    },
    {
        id: 6,
        name: 'July'
    },
    {
        id: 7,
        name: 'August'
    },
    {
        id: 8,
        name: 'September'
    },
    {
        id: 9,
        name: 'October'
    },
    {
        id: 10,
        name: 'November'
    },
    {
        id: 11,
        name: 'December'
    }
];

export const Years = [
    {
        id: 0,
        name: '2015'
    },
    {
        id: 1,
        name: '2016'
    },
    {
        id: 2,
        name: '2017'
    },
    {
        id: 3,
        name: '2018'
    },
    {
        id: 4,
        name: '2019'
    },
    {
        id: 5,
        name: '2020'
    }
];

export const loaderBaseColor = '#4c516d';

export const loaderHighlightColor = '#6e749a';

export const SampleReservations = [
    {
        id: 0,
        name: 'Nicholas Brooks',
        contact: '+91-8527576449',
        time: '12:00 PM',
        guests: 4,
    },
    {
        id: 1,
        name: 'Grace Whittaker',
        contact: '+91-8527576449',
        time: '12:00 PM',
        guests: 2,
    },
    {
        id: 2,
        name: 'Charlotte Hewitt',
        contact: '+91-8527576449',
        time: '01:00 PM',
        guests: 6,
    },
    {
        id: 3,
        name: 'Jay Carey',
        contact: '+91-8527576449',
        time: '01:00 PM',
        guests: 4,
    },
    {
        id: 4,
        name: 'Tim Feierabend',
        contact: '+91-8527576449',
        time: '01:00 PM',
        guests: 2,
    },
    {
        id: 5,
        name: 'Elise Smith',
        contact: '+91-8527576449',
        time: '01:30 PM',
        guests: 5,
    },
    {
        id: 6,
        name: 'Marco Dressier',
        contact: '+91-8527576449',
        time: '2:00 PM',
        guests: 2,
    },
    {
        id: 7,
        name: 'Patrick Theiss',
        contact: '+91-8527576449',
        time: '2:00 PM',
        guests: 3,
    },
]

export const TableDropDownList = [
    {
        id: 0,
        logo: TABLE,
        title: 'Table No'
    }, {
        id: 1,
        logo: TIME,
        title: 'Time'
    }, {
        id: 2,
        logo: RESERVED,
        title: 'Reservations'
    }, {
        id: 3,
        logo: INACTIVE,
        title: 'Inactive Tables'
    }, {
        id: 4,
        logo: CAPTAIN,
        title: 'Captain'
    }];

export const OrdersDropDownList = [
    {
        id: 0,
        logo: supplier_icon,
        title: 'Supplier Name'
    }, {
        id: 1,
        logo: TIME,
        title: 'Time'
    }, {
        id: 2,
        logo: euro_icon,
        title: 'Value'
    }];

export const OnlineOrdersTabBars = ['Active', 'Closed', 'Cancelled'];

export const AllItemsTabBars = ['Active Items', 'Add New Items', 'Deleted Items'];

export const CombosTopTabBars = ['Active Combos', 'Add New Combos', 'Deleted Combos'];

export const OrdersTabBars = ['Active Orders', 'Order History'];

export const ItemsListSample = [
    {price: 10, quantity: 2, itemName: 'Spice It Up'},
    {price: 20, quantity: 1, itemName: 'Chicken Momos'},
    {price: 30, quantity: 3, itemName: 'Magilton'},
    {price: 40, quantity: 1, itemName: 'CupCakes'}
];

export const onlineOrderlistFrame = ['Vendor', 'Time', 'Items', 'Value', 'Status', 'Cancel order'];

export const itemTypes = [
    {
        id: 0,
        logo: shrimp_logo,
        name: 'Appetizers'
    },
    {
        id: 1,
        logo: salad_logo,
        name: 'Salads'
    },
    {
        id: 2,
        logo: entree_logo,
        name: 'Entrees'
    },
    {
        id: 3,
        logo: chinese_noodle_logo,
        name: 'Chinese'
    },
    {
        id: 4,
        logo: side_item_logo,
        name: 'Side Items'
    },
    {
        id: 5,
        logo: dessert_logo,
        name: 'Desserts'
    },
    {
        id: 6,
        logo: beer_logo,
        name: 'Craft Beer'
    },
    {
        id: 7,
        logo: cocktails_logo,
        name: 'Cocktails'
    },
    {
        id: 8,
        logo: mocktail_logo,
        name: 'Mocktails'
    },
    {
        id: 9,
        logo: beer_logo,
        name: 'Beer'
    },
    {
        id: 10,
        logo: whiskey_logo,
        name: 'Whiskey'
    },
    {
        id: 11,
        logo: wine_logo,
        name: 'Wine'
    }
];

export const addItemInputArray = [
    {
        id: 0,
        title: 'Item Name',
        style: 'item_name_input'
    }, {
        id: 1,
        title: 'Item Description',
        style: 'item_description_input'
    }, {
        id: 2,
        title: 'Item Price',
        style: 'item_price_input'
    }, {
        id: 3,
        title: 'Item rating',
        style: 'item_rating_input'
    }, {
        id: 4,
        title: 'Category',
        style: 'item_Category_parent'
    }, {
        id: 5,
        title: 'Add To Favorites',
        style: 'item_favorite_parent'
    }];

export const rating_v_1 = [
    {
        id: 0,
        logo: product_rating_1,
        name: '1'
    },
    {
        id: 1,
        logo: product_rating_2,
        name: '2'
    },
    {
        id: 2,
        logo: product_rating_3,
        name: '3'
    }, {
        id: 3,
        logo: product_rating_4,
        name: '4'
    }, {
        id: 4,
        logo: product_rating_5,
        name: '5'
    }

];

export const rating_v_2 = [
    {
        id: 0,
        logo: product_rating_1,
        name: '1'
    },
    {
        id: 1,
        logo: product_rating_2,
        name: '2'
    },
    {
        id: 2,
        logo: product_rating_3,
        name: '3'
    }, {
        id: 3,
        logo: product_rating_4,
        name: '4'
    }, {
        id: 4,
        logo: product_rating_5,
        name: '5'
    }];

export const overviewList = [
    {
        id: 0,
        totalData: '3,021',
        month: 'october',
        trend: '12.59%',
        previousMonth: '4,980',
        logo: total_orders,
        theme: ''
    },
    {
        id: 1,
        totalData: '4,590',
        month: 'october',
        trend: '12.59%',
        previousMonth: '4,231',
        logo: total_orders
    },
    {
        id: 2,
        totalData: '4.5',
        month: 'october',
        trend: '12.59%',
        previousMonth: '4.93',
        logo: total_orders
    },
    {
        id: 3,
        totalData: '72 Min',
        month: 'october',
        trend: '12.59%',
        previousMonth: '88 Min',
        logo: total_orders
    },
    {
        id: 4,
        totalData: '3.3',
        month: 'october',
        trend: '12.59%',
        previousMonth: '4.1',
        logo: total_orders
    },
    {
        id: 5,
        totalData: '32.19',
        month: 'october',
        trend: '2.59%',
        previousMonth: '24.09',
        logo: total_orders
    },

];

export const dataChart = [
    {date: 1, earnings: 200},
    {date: 2, earnings: 3200},
    {date: 3, earnings: 400},
    {date: 4, earnings: 800},
    {date: 5, earnings: 200},
    {date: 6, earnings: 1270},
    {date: 7, earnings: 730},
    {date: 8, earnings: 3480},
    {date: 9, earnings: 460},
    {date: 10, earnings: 2390},
    {date: 11, earnings: 470},
    {date: 12, earnings: 1090},
    {date: 13, earnings: 390},
    {date: 14, earnings: 590},
    {date: 15, earnings: 1650},
    {date: 16, earnings: 3432},
    {date: 17, earnings: 850},
    {date: 18, earnings: 579},
    {date: 19, earnings: 1349},
    {date: 20, earnings: 1534},
    {date: 21, earnings: 259},
    {date: 22, earnings: 2350},
    {date: 23, earnings: 3480},
    {date: 24, earnings: 876},
    {date: 25, earnings: 2802},
    {date: 26, earnings: 746},
    {date: 27, earnings: 2523},
    {date: 28, earnings: 467},
    {date: 29, earnings: 3900},
    {date: 30, earnings: 160}
];

export const dataChart2 = [
    {date: 1, earnings: 250},
    {date: 2, earnings: 3800},
    {date: 3, earnings: 300},
    {date: 4, earnings: 900},
    {date: 5, earnings: 600},
    {date: 6, earnings: 270},
    {date: 7, earnings: 1730},
    {date: 8, earnings: 3080},
    {date: 9, earnings: 360},
    {date: 10, earnings: 2190},
    {date: 11, earnings: 410},
    {date: 12, earnings: 2090},
    {date: 13, earnings: 310},
    {date: 14, earnings: 510},
    {date: 15, earnings: 1150},
    {date: 16, earnings: 2132},
    {date: 17, earnings: 750},
    {date: 18, earnings: 479},
    {date: 19, earnings: 949},
    {date: 20, earnings: 1034},
    {date: 21, earnings: 260},
    {date: 22, earnings: 1550},
    {date: 23, earnings: 2480},
    {date: 24, earnings: 576},
    {date: 25, earnings: 1802},
    {date: 26, earnings: 746},
    {date: 27, earnings: 2323},
    {date: 28, earnings: 467},
    {date: 29, earnings: 2900},
    {date: 30, earnings: 160}
];

export const Orders = [
    {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    }, {
        branchID: "14aHVVBC53PWPtzxGpfs",
        customer: {
            name: "Deepika Singh",
            contactNumber: "8938801729",
            feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
        },
        date: new Date(1581787143).toDateString(),
        time: new Date(1581787143).toLocaleTimeString(),
        items: [{
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fruit Tako",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Burger Patty",
            quantity: 2,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Corona Extra",
            quantity: 1,
            logo: ''
        }, {
            id: "UVNoBTGgO2bRRUGAQvRF",
            name: "Fries",
            quantity: 1,
            logo: ''
        }],
        value: 600,
        status: "COMPLETED",
        tableNumber: 5,
        chefRating: 4,
        captainRating: 4,
        foodRating: 5,
        restaurantRating: 5,
        guests: 5,
        dineDuration: '149 min'
    },
];

export const OrderColumns = ['Order Id', 'Date', 'Time', '', 'Guests', 'Dine Duration', 'Rating', 'Bill Amount'];
export const EmployeeColumns = ['Name', 'Date of Joining', 'Status', 'Designation', 'Hours', 'Rating', 'Pay Scale'];
export const ExpenseColumns = ['Category', 'Date & Time', 'Type', 'Employee In Charge', 'Payment Status', 'Bill Amount'];

export const inventoryList = [
    {
        id: 0,
        title: 'Dashboard',
        logo: dashboard_icon,
        path: ROUTES.INVENTORY
    },
    {
        id: 1,
        title: 'Supplier',
        logo: supplier_icon,
        path: ROUTES.SUPPLIER
    },
    {
        id: 2,
        title: 'Orders',
        logo: order_icon,
        path: ROUTES.IORDERS
    },
    {
        id: 3,
        title: 'Storage Area',
        logo: fridge_icon,
        path: ROUTES.STORAGEAREA
    },
    {
        id: 4,
        title: 'Inventory Items',
        logo: inventoryItems_icon,
        path: ROUTES.INVENTORYITEMS
    },
    {
        id: 5,
        title: 'Menu Items',
        logo: menuItems_icon,
        path: ROUTES.MENUITEMS
    },
    {
        id: 6,
        title: 'Wastage',
        logo: wastage_icon,
        path: ROUTES.WASTAGE
    },
    {
        id: 7,
        title: 'Surplus',
        logo: food_surplus_icon,
        path: ROUTES.SURPLUS
    },
    {
        id: 8,
        title: 'F & B Cost',
        logo: cogs_icon,
        path: ROUTES.FBCOST
    }];

export const rawItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'];

export const supplierlistFrame = ['Name', 'Contact Number', 'Mail Id', 'Items', 'Account Details'];

export const inventoryOrdersListFrame = ['Supplier', 'Order Recieved Time', 'Items', 'Value', 'Order Status', 'Payment Status'];

export const storageListFrame = ['Storage Name', 'Cleaning Schedule', 'Last Cleaned Date', 'Employee In Charge', 'Storage Status'];

export const menuItemListFrame = ['Item Name', 'Category', 'Ingredients Used', 'Approximate Cost', 'Selling Price', 'Profit'];

export const COGSFOODLISTFRAME = ['Category', 'Units Sold', 'Date', 'COGS', 'Selling Price', 'Profit'];

export const COGSOVERALLLISTFRAME = ['Total Units Sold', 'COGS', 'Selling Price', 'Wastage', 'Profit'];

export const EMPLOYEEOVERALLLISTFRAME = ['Total Units Sold', 'Revenue', 'Labour Cost', 'Profit'];

export const wastageListFrame = ['Item', 'Quantity', 'Time & Date', 'Reasons for wastage', 'Employee in Charge', 'Approximate Cost'];

export const InventoryItemsDropDownList = [
    {
        id: 0,
        logo: inventoryItems_icon,
        title: 'Name'
    }, {
        id: 1,
        logo: category_icon,
        title: 'Category'
    }, {
        id: 2,
        logo: shelfLife_icon,
        title: 'Shelf Life'
    }, {
        id: 3,
        logo: units_icon,
        title: 'No of Units'
    }, {
        id: 4,
        logo: accounts_icon,
        title: 'Inventory Cost'
    }, {
        id: 5,
        logo: food_surplus_icon,
        title: 'Best Before'
    }];

export const COGSFoodDropDown = [
    {
        id: 0,
        logo: category_icon,
        title: 'Overall'
    }, {
        id: 1,
        logo: shrimp_logo,
        title: 'Appetizers'
    }, {
        id: 2,
        logo: salad_logo,
        title: 'Salad'
    }, {
        id: 3,
        logo: entree_logo,
        title: 'Entrees'
    }, {
        id: 4,
        logo: chinese_noodle_logo,
        title: 'Chinese'
    }, {
        id: 5,
        logo: side_item_logo,
        title: 'Side Items'
    }, {
        id: 6,
        logo: dessert_logo,
        title: 'Desserts'
    }];

export const sortDurationData = [
    {
        id: 0,
        label: 'Till Date'
    },
    {
        id: 1,
        label: 'Annual'
    },
    {
        id: 2,
        label: 'Quarter'
    }, {
        id: 3,
        label: 'Month'
    }, {
        id: 4,
        label: 'Day'
    }
];

export const IconSetList = [
    {
        id: 0,
        logo: barbecue_icon
    }, {
        id: 1,
        logo: barbecue_1_icon
    }, {
        id: 2,
        logo: beer_1_icon
    }, {
        id: 3,
        logo: beer_2_icon
    }, {
        id: 4,
        logo: boiled_egg_icon
    }, {
        id: 5,
        logo: burger_icon
    }, {
        id: 6,
        logo: cake_icon
    }, {
        id: 7,
        logo: canape_icon
    }, {
        id: 8,
        logo: chinese_icon
    }, {
        id: 9,
        logo: cocktail_icon
    }, {
        id: 10,
        logo: cocktail_1_icon
    }, {
        id: 11,
        logo: coconut_icon
    }, {
        id: 12,
        logo: coffee_icon
    }, {
        id: 13,
        logo: corndog_icon
    }, {
        id: 14,
        logo: cupcake_icon
    }, {
        id: 15,
        logo: doughnut_icon
    }, {
        id: 16,
        logo: doughnut_1_icon
    }, {
        id: 17,
        logo: fish_icon
    }, {
        id: 18,
        logo: fish_and_chips_icon
    }, {
        id: 19,
        logo: fruit_icon
    }, {
        id: 20,
        logo: honey_icon
    }, {
        id: 21,
        logo: hot_dog_icon
    }, {
        id: 22,
        logo: ice_cream_icon
    }, {
        id: 23,
        logo: ice_cream_1_icon
    }, {
        id: 24,
        logo: ice_cream_2_icon
    }, {
        id: 25,
        logo: ice_cream_4_icon
    }, {
        id: 26,
        logo: ice_cream_5_icon
    }];

export const itemType = [
    {
        id:'0',
        data:{name:'Food'}
    },
    {
        id:'1',
        data:{name:'Beverage'}
    }
]
export const veg_nonVeg = [
    {
        id:'0',
        data:{name:'Veg'}
    },
    {
        id:'1',
        data:{name:'Non-Veg'}
    }
]


