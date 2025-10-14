"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

interface TokenPackage {
    id: string
    name: string
    tokens: number
    price: number
}

export default function TokenPackagesPage() {
    const [packages, setPackages] = useState<TokenPackage[]>([])
    const [newPackage, setNewPackage] = useState({ name: "", tokens: 0, price: 0 })
    const [editingPackage, setEditingPackage] = useState<TokenPackage | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchPackages = useCallback(async () => {
        try {
            const supabase = createClient()
            const { data, error } = await supabase.from("token_packages").select("*").order("price", { ascending: true })
            if (error) {
                console.error("Error fetching packages:", error)
                toast.error("Failed to fetch token packages")
            } else {
                setPackages(data || [])
            }
        } catch (err) {
            console.error("Unexpected error:", err)
            toast.error("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPackages()
    }, [fetchPackages])

    const handleCreate = async () => {
        const supabase = createClient()
        const { error } = await supabase.from("token_packages").insert([newPackage])
        if (error) {
            toast.error("Failed to create token package")
        } else {
            toast.success("Token package created")
            setNewPackage({ name: "", tokens: 0, price: 0 })
            fetchPackages()
        }
    }

    const handleUpdate = async () => {
        if (!editingPackage) return
        const supabase = createClient()
        const { error } = await supabase
            .from("token_packages")
            .update({ name: editingPackage.name, tokens: editingPackage.tokens, price: editingPackage.price })
            .eq("id", editingPackage.id)
        if (error) {
            toast.error("Failed to update token package")
        } else {
            toast.success("Token package updated")
            setEditingPackage(null)
            fetchPackages()
        }
    }

    const handleDelete = async (id: string) => {
        const supabase = createClient()
        const { error } = await supabase.from("token_packages").delete().eq("id", id)
        if (error) {
            toast.error("Failed to delete token package")
        } else {
            toast.success("Token package deleted")
            fetchPackages()
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Token Packages</h1>

            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="text-center">Loading...</div>
                </div>
            ) : (
                <>
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Create New Package</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Input
                                    placeholder="Name"
                                    value={newPackage.name}
                                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Tokens"
                                    value={newPackage.tokens || ""}
                                    onChange={(e) => setNewPackage({ ...newPackage, tokens: parseInt(e.target.value) || 0 })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={newPackage.price || ""}
                                    onChange={(e) => setNewPackage({ ...newPackage, price: parseFloat(e.target.value) || 0 })}
                                />
                                <Button onClick={handleCreate}>Create Package</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Packages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Tokens</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {packages.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                                                No packages found. Create one above.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        packages.map((pkg) => (
                                            <TableRow key={pkg.id}>
                                                {editingPackage?.id === pkg.id ? (
                                                    <>
                                                        <TableCell>
                                                            <Input
                                                                value={editingPackage.name}
                                                                onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                type="number"
                                                                value={editingPackage.tokens}
                                                                onChange={(e) =>
                                                                    setEditingPackage({ ...editingPackage, tokens: parseInt(e.target.value) })
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                type="number"
                                                                value={editingPackage.price}
                                                                onChange={(e) =>
                                                                    setEditingPackage({ ...editingPackage, price: parseFloat(e.target.value) })
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex space-x-2">
                                                                <Button onClick={handleUpdate}>Save</Button>
                                                                <Button onClick={() => setEditingPackage(null)} variant="outline">
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell>{pkg.name}</TableCell>
                                                        <TableCell>{pkg.tokens}</TableCell>
                                                        <TableCell>${pkg.price}</TableCell>
                                                        <TableCell>
                                                            <div className="flex space-x-2">
                                                                <Button onClick={() => setEditingPackage(pkg)}>Edit</Button>
                                                                <Button onClick={() => handleDelete(pkg.id)} variant="destructive">
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </>
                                                )}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}