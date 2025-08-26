
"use client";

import { useState, DragEvent, forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type CardData = {
  id: string;
  title: string;
  customer: string;
  avatarUrl: string;
  priority: "High" | "Medium" | "Low";
};

type ColumnData = {
  id: string;
  title: string;
  cards: CardData[];
};

const initialColumns: ColumnData[] = [
  {
    id: "received",
    title: "Received",
    cards: [
      { id: "task-1", title: "Honda Civic - Oil Change", customer: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?u=a1", priority: "Low" },
      { id: "task-2", title: "Ford F-150 - Engine Knock", customer: "Bob Williams", avatarUrl: "https://i.pravatar.cc/150?u=a2", priority: "High" },
    ],
  },
  {
    id: "diagnosed",
    title: "Diagnosed",
    cards: [
      { id: "task-3", title: "Toyota Camry - Brake Inspection", customer: "Charlie Brown", avatarUrl: "https://i.pravatar.cc/150?u=a3", priority: "Medium" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "task-4", title: "BMW X5 - Transmission Fluid", customer: "Diana Prince", avatarUrl: "https://i.pravatar.cc/150?u=a4", priority: "High" },
    ],
  },
  {
    id: "quality-check",
    title: "Quality Check",
    cards: [
        { id: "task-5", title: "Audi A4 - Tire Rotation", customer: "Eve Adams", avatarUrl: "https://i.pravatar.cc/150?u=a5", priority: "Low" },
    ],
  },
  {
    id: "complete",
    title: "Complete",
    cards: [],
  },
];

export const KanbanBoard = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const [draggedItem, setDraggedItem] = useState<{ colId: string; cardId: string } | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, colId: string, cardId: string) => {
    setDraggedItem({ colId, cardId });
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>, targetColId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { colId: sourceColId, cardId } = draggedItem;

    if (sourceColId === targetColId) {
        setDraggedItem(null);
        return;
    }

    let cardToMove: CardData | undefined;
    const newColumns = columns.map(col => {
        if (col.id === sourceColId) {
            cardToMove = col.cards.find(c => c.id === cardId);
            return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
        }
        return col;
    });

    if (cardToMove) {
        const finalColumns = newColumns.map(col => {
            if (col.id === targetColId) {
                return { ...col, cards: [...col.cards, cardToMove!] };
            }
            return col;
        });
        setColumns(finalColumns);
    }
    setDraggedItem(null);
  };

  const priorityStyles = {
    High: "bg-red-500/20 text-red-400 border-red-500/30",
    Medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Low: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" ref={ref} {...props}>
      {columns.map((col) => (
        <div
          key={col.id}
          className="w-72 shrink-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <Card className="h-full bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{col.title}</span>
                <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-md">{col.cards.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, col.id, card.id)}
                  className={cn(
                    "bg-card p-4 rounded-lg shadow-sm cursor-grab active:cursor-grabbing border-l-4 hover:shadow-md transition-shadow",
                    priorityStyles[card.priority]
                   )}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm mb-2">{card.title}</h4>
                    <Badge variant="outline" className={cn("text-xs", priorityStyles[card.priority])}>{card.priority}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={card.avatarUrl} />
                      <AvatarFallback>{card.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{card.customer}</span>
                  </div>
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="h-24 flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                    Drop cards here
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
});

KanbanBoard.displayName = "KanbanBoard";
