import {memo} from "react";

type RefreshButtonProps = {
    onRefresh: () => Promise<void>;
    isPending: boolean;
}

function RefreshButton({ onRefresh, isPending } : RefreshButtonProps) {
    return (
        <button
            onClick={onRefresh}
            className="btn btn-warning btn-sm"
            disabled={isPending}>
            {isPending ? "Refreshing…" : "Refresh"}
        </button>
    );
}

export default memo(RefreshButton);