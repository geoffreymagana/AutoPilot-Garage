
"use client";

import { useRef } from "react";
import { KanbanBoard } from "@/components/kanban-board";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkOrdersPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };


  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
            Drag and drop to update job status.
        </p>
        <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll Left</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll Right</span>
            </Button>
        </div>
      </div>
      <KanbanBoard ref={scrollContainerRef} />
    </div>
  );
}
