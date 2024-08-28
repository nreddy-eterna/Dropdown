import React, { useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Dropdown, { DropdownItem } from "../../components/button/Dropdown";
import styled from "styled-components";
import { clsx } from "clsx";
import style from "../../components/A1_Header/Header.module.scss";
import { ButtonCustom } from "../../components/_common/ButtonCustom/ButtonCustom";
import { svgIcons } from "../../assets/svgIcons";

const TwitterAuth = () => {
    const { data: session } = useSession();
    const [dropdown, setDropdown] = React.useState(false);
    const handle = session?.user?.name;

    const onClick = () => {
        if (session) {
            setDropdown(true);
        } else {
            signIn("twitter");
        }
    };

    const items: DropdownItem[] = [
        {
            label: "Sign Out",
            onClick: () => {
                signOut();
                setDropdown(false);
            },
            closeDropdown: true,
            icon: svgIcons.logout,
        },
    ];

    useEffect(() => {
        if (!handle) {
            setDropdown(false);
        }
    }, [handle]);

    const label = handle ?? "Connect Twitter";

    return (
        <Dropdown dropdown={dropdown} setDropdown={setDropdown} items={items}>
            <ButtonCustom
                className={clsx(
                    {
                        [style.connectBtn]: !handle,
                        [style.connectedItem]: !!handle,
                    },
                    style.borderItem
                )}
                onClick={onClick}
            >
                {handle ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {svgIcons.x}
                        <p style={{ marginLeft: "8px" }}>{handle}</p>
                    </div>
                ) : (
                    "Connect Twitter"
                )}
            </ButtonCustom>
        </Dropdown>
    );
};

export default TwitterAuth;
