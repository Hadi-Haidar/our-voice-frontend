import * as Icons from "@radix-ui/react-icons";

// This object maps the string identifiers from the DB to real React components.
// If an admin adds a new category with a string like "BackpackIcon", we just need to add it here.
export const ICON_MAP = {
    "HammerIcon": Icons.ArchiveIcon,
    "TrashIcon": Icons.TrashIcon,
    "LightningBoltIcon": Icons.LightningBoltIcon,
    "ExclamationTriangleIcon": Icons.SymbolIcon,
    "LeafIcon": Icons.GlobeIcon,
    "PlusCircledIcon": Icons.PlusCircledIcon,
    "BackpackIcon": Icons.BackpackIcon,
    "OpacityIcon": Icons.OpacityIcon,
    "ViewGridIcon": Icons.ViewGridIcon,
    "LockClosedIcon": Icons.LockClosedIcon,
    "PersonIcon": Icons.PersonIcon,
    "MobileIcon": Icons.MobileIcon,
    "HeartIcon": Icons.HeartIcon,
    "TimerIcon": Icons.TimerIcon,
};

/**
 * A helper component that renders a Radix icon based on its string name.
 * @param {string} name - The name of the icon from the DB (e.g., "TrashIcon")
 * @param {string} className - Optional Tailwind/CSS classes
 */
export const CategoryIcon = ({ name, className }) => {
    // If the name exists in our map, use it. Otherwise, fallback to a generic QuestionMark.
    const IconComponent = ICON_MAP[name] || Icons.QuestionMarkIcon;
    return <IconComponent className={className} />;
};
