import { Button } from '@/components/ui/button';

interface Props {
    tag: string;
    onDelete: (tag: string) => void;
}

export default function TagChip(props: Props) {
    return (
        <div className="inline-flex items-center pl-3 pr-1 py-1 bg-gray-200 rounded-full mr-2 mb-2">
            <span className="text-sm font-medium text-gray-800">{props.tag}</span>
            <Button
                type="button"
                size="sm"
                className="ml-2 h-6 !bg-gray-200 !text-gray-400 !px-1 !py-0 hover:!text-black" onClick={() => props.onDelete(props.tag)}
            >&times;</Button>
        </div>
    );
}
