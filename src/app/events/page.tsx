'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Film, Gamepad2, Mic, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { events as allEventsData } from '@/lib/data';
import { format, addDays, subDays, startOfWeek, endOfWeek, isSameDay, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const eventIcons: { [key: string]: React.ElementType } = {
  'Movie Night': Film,
  'Game Tournament': Gamepad2,
  'Karaoke Night': Mic,
};

export default function EventsPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDay, setSelectedDay] = React.useState(new Date());

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek, i));

  const filteredEvents = allEventsData.filter(event => {
    const eventDate = parseISO(event.isoDate);
    return isSameDay(eventDate, selectedDay);
  });

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handlePrevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Jadwal <span className="text-primary">Acara</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Ikuti keseruannya! Inilah jadwal acara mingguan di Parade Palace.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h2 className="font-headline text-2xl font-bold text-primary">
              {format(startOfCurrentWeek, 'd MMM', { locale: id })} - {format(endOfCurrentWeek, 'd MMM yyyy', { locale: id })}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleNextWeek}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-7 gap-2 text-center">
          {weekDays.map(day => (
            <div key={day.toString()}>
              <p className="text-sm text-muted-foreground">{format(day, 'EEE', { locale: id })}</p>
              <Button
                variant={isSameDay(day, selectedDay) ? 'default' : 'outline'}
                className={`mt-1 w-12 h-12 rounded-full flex flex-col items-center justify-center relative ${
                  isSameDay(day, new Date()) ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="text-xl font-bold">{format(day, 'd')}</span>
                {allEventsData.some(e => isSameDay(parseISO(e.isoDate), day)) && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent"></span>
                )}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div>
        <h3 className="font-headline text-2xl font-bold mb-4">Acara untuk {format(selectedDay, 'eeee, d MMMM yyyy', { locale: id })}</h3>
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map(event => {
              const Icon = eventIcons[event.title] || CalendarIcon;
              return (
                <Card key={event.title} className="transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
      
                      <div className='w-full'>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                           <CardTitle className="font-headline text-xl text-primary">{event.title}</CardTitle>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                           </div>
                        </div>
                        <CardDescription className="mt-1">{event.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">
                      <Bell className="mr-2 h-4 w-4" />
                      Atur Pengingat
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">Tidak Ada Acara Terjadwal</h3>
            <p className="mt-1 text-sm text-muted-foreground">Silakan periksa tanggal lain untuk acara mendatang.</p>
          </div>
        )}
      </div>
    </div>
  );
}
