'use client'
import { createContext, useContext, useState, ReactNode } from "react";


type CardContextType = {
    card: object| undefined
    setCard: (card: object) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);


export const CardProvider = ({ children }: { children: ReactNode }) => {
    const [card, setCard] = useState<object | undefined>(undefined);
    const [action, setAction] = useState();
    return (
        <CardContext.Provider value={{card, setCard}}>
            {children}
        </CardContext.Provider>
    )
}

export const useCardContext = () => {
    const context = useContext(CardContext)
    if (!context) {
        throw new Error("We've had some problems with the card provider.")
    }
    return context;
}