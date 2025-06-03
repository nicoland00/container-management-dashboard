import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";

interface Container {
  ID: string;
  Names: string;
  State: string;
  Image: string;
}

export default function IndexPage() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchContainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/containers`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Container[] = await res.json();
      setContainers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: string) => {
    try {
      const res = await fetch(`${API_BASE}/containers/${id}/${action}`, {
        method: "POST"
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `Failed to ${action}`);
      }
      fetchContainers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Docker Control Panel</h1>
          <Button onClick={fetchContainers} disabled={loading}>
            {loading ? "..." : "Refresh"}
          </Button>
        </div>

        {/* Error & Loading */}
        {error && <p className="text-red-500">Error: {error}</p>}
        {loading && <p>Loading containers...</p>}
        {!loading && containers.length === 0 && (
          <p>No containers found. Start some and refresh.</p>
        )}

        {/* Container Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((c) => (
            <Card key={c.ID} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{c.Names}</p>
                  <p className="text-sm text-gray-500">{c.Image}</p>
                </div>
                <Badge
                  variant={
                    c.State === "running"
                      ? "success"
                      : c.State === "exited"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {c.State.toUpperCase()}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAction(c.ID, "start")}
                  disabled={c.State === "running"}
                >
                  Start
                </Button>
                <Button
                  onClick={() => handleAction(c.ID, "stop")}
                  disabled={c.State !== "running"}
                  variant="destructive"
                >
                  Stop
                </Button>
                <Button onClick={() => handleAction(c.ID, "restart")}>
                  Restart
                </Button>
                <Button onClick={() => handleAction(c.ID, "kill")} variant="outline">
                  Kill
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
