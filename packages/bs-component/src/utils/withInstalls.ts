import type { App, Plugin } from 'vue';
const withInstall = (main)=>{
    (main).install = (app:App)=>{
        app.component(main.name, main);
    }
    return main;
};

export default withInstall;
