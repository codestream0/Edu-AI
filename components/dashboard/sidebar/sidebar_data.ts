import {BarChart3, Bookmark, CircleHelp, ClipboardList, Clock, FileText, Home, Settings, Sparkles} from "lucide-react";

export const mainNavigation = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
    },
    {
        title:"Ai tutor",
        href:"/ai-tutor",
        icon: Sparkles,
    },
    {
        title:"Document",
        href:"/document",
        icon: FileText,
    },
    {
        title:"Quizzes",
        href:"/quizzes",
        icon: ClipboardList,
    },
    {
        title:"Study progress",
        href:"/progress",
        icon: BarChart3,
    }

]

export const secondaryNavigation = [
    {
        title:"Saved Materials",
        href:"/saved",
        icon: Bookmark,
    },
    {
        title:"Recent activity",
        href:"/activity",
        icon: Clock,
    }
]

export const bottomNavigation = [
    {
        title:"Settings",
        href:"/settings",
        icon: Settings,
    },
    {
        title:"Help & Support",
        href:"/help",
        icon: CircleHelp,
    }
]