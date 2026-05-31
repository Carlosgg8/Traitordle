import React from "react";


export default function Avatar( { name } ) {
    const words = name.trim().split(" ");
    const firstInitial = words[0]?.[0] || "";
    const lastInitial =
        words.length > 1 ? words[words.length - 1][0] : "";
    const initials = `${firstInitial}${lastInitial}`.toUpperCase();

    // Generate color from name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
    }

    const hue = hash % 360;
    const backgroundColor = `hsl(${hue}, 65%, 45%)`;

    return (
        <div
        style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            userSelect: "none",
        }}
        >
        {initials}
        </div>
    );
        
}