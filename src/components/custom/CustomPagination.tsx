import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface Props {
  totalPages: number;
  limit?: number;
  offset?: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const page: number = 1;
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {Array.from({ length: totalPages })
        .slice(0, 3)
        .map((_, index) => (
          <Button
            variant={page === index + 1 ? "default" : "outline"}
            key={index}
            size="sm"
          >
            {index + 1}
          </Button>
        ))}

      {Array.from({ length: totalPages }).length > 3 && (
        <Button variant="ghost" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}

      <Button variant="outline" size="sm" disabled={page === totalPages}>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
