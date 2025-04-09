import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, DollarSign, Calendar, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  budget: number;
  attendees: number;
  image: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Hackathon 2024",
      date: "2024-03-15",
      description: "Annual hackathon event",
      budget: 50000,
      attendees: 200,
      image: "/events/event1.jpg"
    },
    {
      id: 2,
      title: "Tech Conference",
      date: "2024-04-05",
      description: "Industry conference",
      budget: 30000,
      attendees: 150,
      image: "/events/event2.jpg"
    }
  ]);

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    description: '',
    budget: 0,
    attendees: 0,
    image: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleAddEvent = () => {
    const event: Event = {
      ...newEvent,
      id: events.length + 1
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      description: '',
      budget: 0,
      attendees: 0,
      image: ''
    });
    setIsDialogOpen(false);
  };

  const handleEditEvent = () => {
    if (!editingEvent) return;
    setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const totalBudget = events.reduce((sum, event) => sum + event.budget, 0);
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
          >
            Back to Home
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="bg-neon-blue/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-neon-blue" />
              </div>
              <div>
                <p className="text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-foreground">₹{totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="bg-neon-purple/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-neon-purple" />
              </div>
              <div>
                <p className="text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-foreground">{events.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="bg-neon-pink/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-neon-pink" />
              </div>
              <div>
                <p className="text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold text-foreground">{totalAttendees}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Events Table */}
        <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Events</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="relative overflow-hidden group">
                  <span className="absolute inset-0 bg-neon-gradient animate-gradient-animation bg-300%"></span>
                  <span className="relative flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Event
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editingEvent?.title || newEvent.title}
                      onChange={(e) => {
                        if (editingEvent) {
                          setEditingEvent({ ...editingEvent, title: e.target.value });
                        } else {
                          setNewEvent({ ...newEvent, title: e.target.value });
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={editingEvent?.date || newEvent.date}
                      onChange={(e) => {
                        if (editingEvent) {
                          setEditingEvent({ ...editingEvent, date: e.target.value });
                        } else {
                          setNewEvent({ ...newEvent, date: e.target.value });
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editingEvent?.description || newEvent.description}
                      onChange={(e) => {
                        if (editingEvent) {
                          setEditingEvent({ ...editingEvent, description: e.target.value });
                        } else {
                          setNewEvent({ ...newEvent, description: e.target.value });
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget (₹)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={editingEvent?.budget || newEvent.budget}
                      onChange={(e) => {
                        if (editingEvent) {
                          setEditingEvent({ ...editingEvent, budget: Number(e.target.value) });
                        } else {
                          setNewEvent({ ...newEvent, budget: Number(e.target.value) });
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="attendees">Expected Attendees</Label>
                    <Input
                      id="attendees"
                      type="number"
                      value={editingEvent?.attendees || newEvent.attendees}
                      onChange={(e) => {
                        if (editingEvent) {
                          setEditingEvent({ ...editingEvent, attendees: Number(e.target.value) });
                        } else {
                          setNewEvent({ ...newEvent, attendees: Number(e.target.value) });
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={editingEvent?.image || newEvent.image}
                      onChange={(e) => {
                        if (editingEvent) {
                          setEditingEvent({ ...editingEvent, image: e.target.value });
                        } else {
                          setNewEvent({ ...newEvent, image: e.target.value });
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingEvent(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editingEvent ? handleEditEvent : handleAddEvent}
                    className="relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-neon-gradient animate-gradient-animation bg-300%"></span>
                    <span className="relative">{editingEvent ? 'Save Changes' : 'Add Event'}</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>₹{event.budget.toLocaleString()}</TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingEvent(event);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 