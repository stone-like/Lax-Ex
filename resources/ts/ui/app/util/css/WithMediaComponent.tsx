import React from "react";
import Media from "react-media";

type MenuProps = {
    active: boolean;
};
const WithMediaComponent = (
    DesktopComponent: React.FC,
    MoblieComponent: React.FC,
    BreakP: number
) => {
    return (
        <Media query={`(min-width:${BreakP}px)`}>
            {matches =>
                matches ? (
                    //768以上
                    <DesktopComponent />
                ) : (
                    <MoblieComponent />
                )
            }
        </Media>
    );
};

export default WithMediaComponent;
