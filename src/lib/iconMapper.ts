import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const getIconComponent = (iconName : string | undefined) : LucideIcon => {
    const IconComponent = Icons[(iconName || "HelpCircle") as keyof typeof Icons]

    if(!IconComponent){
        return Icons.HelpCircle
    }

    return IconComponent as LucideIcon
}
