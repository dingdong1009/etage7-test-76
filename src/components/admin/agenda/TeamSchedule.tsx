
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamScheduleProps {
  selectedDate: Date;
}

const TeamSchedule = ({ selectedDate }: TeamScheduleProps) => {
  // Mock team data for demonstration
  const team = [
    {
      id: "1",
      name: "Sophie Martin",
      role: "Senior Consultant",
      avatar: "",
      availability: "available",
    },
    {
      id: "2",
      name: "Alexandre Chen",
      role: "Marketing Specialist",
      avatar: "",
      availability: "busy",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium mb-1">Team Schedule</h2>
        <p className="text-sm text-gray-500">{format(selectedDate, "PP")}</p>
      </div>

      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
            <Badge 
              variant={member.availability === "available" ? "outline" : "secondary"}
              className={member.availability === "available" ? "bg-accent-mint text-gray-800 border-accent-mint" : ""}
            >
              {member.availability === "available" ? "Available" : "Busy"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSchedule;
