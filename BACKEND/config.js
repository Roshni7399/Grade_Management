
const config = {
    local: {
        DB:{
            HOST: "172.10.1.3",
            PORT: "27017",
            DATABASE: "roshnimanmode",
            MONGOOSE:{
                useUnifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "roshnimanmode",
            Password: "roshnimanmode45"
        },
        PORTNO : 8181,
       
    },

    staging: {
        DB:{
            HOST: "172.10.1.3",
            PORT: "27017",
            DATABASE: "roshnimanmode",
            MONGOOSE:{
                useUndifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "roshnimanmode",
            Password: "roshnimanmode45"
        },
        PORTNO : 8080,
        EMAIL : {
            host: "smp.gmail.com",
            port:  465,
            username: "roshnimanmode07@gmail.com",
            password: "wcbcayflwduvxtls",
        }
    },
}
export const get = function get (env){
    return config[env];
}