import { IncidentData } from "@/hooks/use-incident-metrics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface IncidentListProps {
  incidents: IncidentData[];
}

export function IncidentList({ incidents }: IncidentListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr. No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Report Ref</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell className="font-medium">{incident.srno}</TableCell>
              <TableCell>
                {incident.incidentdate ? 
                  format(new Date(incident.incidentdate), 'dd/MM/yyyy') : 
                  'N/A'}
              </TableCell>
              <TableCell>{incident.time || 'N/A'}</TableCell>
              <TableCell>{incident.section || 'N/A'}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {incident.details || 'N/A'}
              </TableCell>
              <TableCell>{incident.reportref || 'N/A'}</TableCell>
              <TableCell className="text-right">
                <Badge variant={incident.reportref ? "default" : "secondary"}>
                  {incident.reportref ? 'Reported' : 'Pending'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {incidents.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No incidents recorded this month
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}