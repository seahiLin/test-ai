import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

export default function EveFormItem({
  formControl,
  icon,
  name,
  label,
  render
}: {
  formControl: Control;
  icon: React.ReactNode;
  name: string;
  label: string;
  render: (props: any) => React.ReactNode;
}) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-start space-y-0 gap-6">
          {icon}
          <div>
            <FormLabel className="leading-6 mb-3 inline-block">
              {label}：
            </FormLabel>
            {render({field})}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
