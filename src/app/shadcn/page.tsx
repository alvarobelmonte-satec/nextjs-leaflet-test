'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CloudDownload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

import dayjs from 'dayjs';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/components/ui/use-toast';

export default function ShadcnPage() {
  const [date, setDate] = useState<Date>();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: dayjs().add(5, 'day').toDate()
  });

  const { toast } = useToast();

  return (
    <div className="p-4">
      <h1>Components</h1>
      <h2>Card</h2>
      <div className="grid grid-cols-3 gap-4 m-4">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <h2>Buttons</h2>
      <div className="grid grid-cols-12 gap-4 m-4">
        <Button>
          default <CloudDownload className="ml-2 h-4 w-4" />
        </Button>
        <Button disabled>
          default <CloudDownload className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline">
          outline <CloudDownload className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" disabled>
          outline <CloudDownload className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="link">link</Button>
        <Button variant="link" disabled>
          link
        </Button>
      </div>
      <h2>Inputs</h2>
      <div className="grid grid-cols-6 gap-4 m-4">
        <Input className="input" placeholder="input" />
        <Input className="input" placeholder="input" disabled />
      </div>
      <h2>Select</h2>
      <Select>
        <SelectTrigger className="w-[290px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <h2>Dates</h2>
      <div className="grid grid-cols-6 gap-4 m-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? dayjs(date).format('MMMM DD, YYYY') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
        {/*         <div className={cn('grid gap-2')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[300px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {dayjs(dateRange.from).format('LLL DD, YYYY')} -{' '}
                      {dayjs(dateRange.to).format('LLL DD, YYYY')}
                    </>
                  ) : (
                    dayjs(dateRange.from).format('LLL DD, YYYY')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) =>
                  range && setDateRange({ from: dayjs(range.from), to: dayjs(range.to) })
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div> */}
      </div>
      <h2>Toast</h2>
      <div className="grid grid-cols-6 gap-4 m-4">
        <Button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              variant: 'destructive'
            });
          }}
        >
          Error Toast
        </Button>
        <Button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              variant: 'success'
            });
          }}
        >
          Success Toast
        </Button>
      </div>
    </div>
  );
}
