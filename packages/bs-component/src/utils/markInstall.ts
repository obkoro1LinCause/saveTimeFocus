const markInstalls  = (plugins:Plugin[])=>{
    const install = (app)=>{
        plugins.forEach((plugin)=>app.use(plugin));
        return app;
    }
    return {
        install
    }
}

export default markInstalls;