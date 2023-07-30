import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={"100%"}
        height={120}
        viewBox="0 0 400 120"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="35" cy="32" r="20" />
        <rect x="172" y="19" rx="2" ry="2" width="70" height="24" />
        <rect x="250" y="19" rx="2" ry="2" width="70" height="24" />
        <circle cx="596" cy="33" r="5" />
    </ContentLoader>
)

export default MyLoader