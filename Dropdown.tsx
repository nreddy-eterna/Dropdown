import React, { useEffect, useRef } from "react";
import style from "./Dropdown.module.scss";
import { clsx } from "clsx";

export type DropdownItem = {
    label: string;
    onClick: () => void;
    closeDropdown?: boolean;
    icon?: React.ReactNode;
};

type Props = {
    children: React.ReactNode;
    dropdown: boolean;
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    items: DropdownItem[];
};

const Dropdown = ({
    children,
    dropdown,
    setDropdown,
    items,
    ...props
}: Props) => {
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const node = ref.current;

            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target as Node)) return;

            setDropdown(false);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);

    return (
        <div className={style.dropdown}>
            {children}
            {
                <div
                    className={clsx({
                        [style.menu]: true,
                        [style.menuActive]: dropdown,
                    })}
                    ref={ref}
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            role="menuitem"
                            onClick={() => {
                                item.onClick();
                                if (item.closeDropdown) {
                                    setDropdown(false);
                                }
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            }
        </div>
    );
};

export default Dropdown;
