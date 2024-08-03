
import Loading from '../component/loading.vue';
import {createApp } from 'vue';

export default {
  install(app:any){
      app.directive('loading',{
        mounted(el:any,binding:any){
          const app = createApp(Loading);
          const instance = app.mount(document.createElement('div'));
          el.instance = instance;
          el.style.position = 'relative';
          if (binding.value) {
            appendEl(el);
          }
        },
        updated(el:any,binding:any) {
          if (binding.value !== binding.oldValue) {
            binding.value ? appendEl(el) : removeEl(el); 
          }
        },
      });
  }
}

const appendEl = (el: { appendChild: (arg:any) => void; instance: { $el:any}; }) =>{
  el.appendChild(el.instance.$el);
};

const removeEl = (el: { removeChild: (arg:any) => void; instance: { $el:any }; }) =>{
  el.removeChild(el.instance.$el);
};
