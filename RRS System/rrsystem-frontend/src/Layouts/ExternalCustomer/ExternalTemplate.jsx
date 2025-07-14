import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";

const Template = () => {
    useEffect(() => {

        const styles = [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css",
            "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
            "https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css",
            "../../../css/bootstrap/bootstrap.min.css",
            "../../../css/ExternalCustomer/style.css",
        ];

        const styleElements = styles.map(href => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
            return link;
        });

        const scripts = [
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
            "../../../js/bootstrap.min.js",
            "../../../js/jquery.min.js",
            "../../../js/main.js",
            "../../../js/popper.js",
        ];

        const scriptElements = scripts.map(src => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
            return script;
        });

        return () => {
            styleElements.forEach(link => document.head.removeChild(link));
            scriptElements.forEach(script => document.body.removeChild(script));
        };

    }, []);

    return (
        <Outlet></Outlet>
    );
};

export default Template;
