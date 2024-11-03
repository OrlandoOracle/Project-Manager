'use client'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

const DragDrop = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Project 1' },
    { id: '2', content: 'Project 2' },
    { id: '3', content: 'Project 3' },
  ]);
  const [newProject, setNewProject] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
  };

  const addProject = () => {
    if (!newProject.trim()) return;
    const newId = (items.length + 1).toString();
    setItems([...items, { id: newId, content: newProject }]);
    setNewProject('');
  };

  const removeProject = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Enter project name"
            className="flex-1"
          />
          <Button onClick={addProject}>
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 mb-2 bg-card text-card-foreground border rounded-lg hover:bg-accent transition-colors flex justify-between items-center"
                    >
                      {item.content}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProject(item.id)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </DragDropContext>
  );
};

export default DragDrop;
