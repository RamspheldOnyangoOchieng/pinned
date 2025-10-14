"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, Loader2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { getCharacters, type Character } from "@/lib/characters";
import { createClient } from "@/lib/supabase/client";

const steps = [
    { label: "Choose Style" },
    { label: "Basic Info" },
    { label: "Communication" },
    { label: "Career" },
    { label: "Personality" },
    { label: "Final Preview" },
];

function ProgressBar({ step }: { step: number }) {
    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300  ${step === i
                            ? "bg-primary border-primary text-primary-foreground"
                            : step > i
                                ? "bg-card border-primary text-primary"
                                : "bg-[#1A1A1A] border-[#252525] text-gray-500"
                            }`}
                    >
                        {step > i ? <CheckCircle className="w-5 h-5" /> : i + 1}
                    </div>
                    <span className="mt-2 text-xs text-gray-400">{s.label}</span>
                    {i < steps.length - 1 && (
                        <div className="w-full h-1 bg-[#252525] mt-2 mb-2">
                            <div
                                className={`h-1 transition-all duration-300 ${step > i ? "bg-primary w-full" : "bg-muted w-0"
                                    }`}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function Card({ emoji, label, value }: { emoji: string; label: string; value: string | number }) {
    return (
        <div className="bg-[#23232b] rounded-xl p-6 flex flex-col items-center shadow-md min-w-[140px]">
            <div className="text-3xl mb-2">{emoji}</div>
            <div className="text-sm text-gray-400 mb-1">{label}</div>
            <div className="text-lg font-semibold text-white">{value}</div>
        </div>
    );
}

function Badge({ text }: { text: string }) {
    return (
    <span className="bg-muted text-primary rounded-full px-4 py-1 text-xs font-semibold mr-2 mb-2 inline-block">
            {text}
        </span>
    );
}


export default function CreateCharacterFlow() {
    const [step, setStep] = useState(0);
    const [style, setStyle] = useState<'realistic' | 'anime'>("realistic");
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [creatingChat, setCreatingChat] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [customName, setCustomName] = useState("");
    const router = useRouter();
    const { user } = useAuth();
    
    // Filter state
    const [filters, setFilters] = useState({
        age: '',
        body: '',
        ethnicity: '',
        language: '',
        relationship: '',
        occupation: '',
        hobbies: '',
        personality: '',
    });

    useEffect(() => {
        setLoading(true);
        getCharacters().then((data) => {
            setCharacters(data);
            if (data.length > 0) setSelected(data[0].id);
            setLoading(false);
        }).catch((error) => {
            console.error("Error loading characters:", error);
            setLoading(false);
        });
    }, []);

    // Get unique values for each filter
    const unique = (key: keyof Character) => Array.from(new Set(characters.map((c) => c[key]).filter(Boolean)));


    // Instead of filtering out, highlight matches but always show all models
    function isMatch(char: Character) {
        return (
            (!filters.age || String(char.age) === filters.age) &&
            (!filters.body || char.body === filters.body) &&
            (!filters.ethnicity || char.ethnicity === filters.ethnicity) &&
            (!filters.language || char.language === filters.language) &&
            (!filters.relationship || char.relationship === filters.relationship) &&
            (!filters.occupation || char.occupation === filters.occupation) &&
            (!filters.hobbies || char.hobbies.includes(filters.hobbies)) &&
            (!filters.personality || char.personality.includes(filters.personality))
        );
    }

    const baseCharacter = characters.find((c) => c.id === selected);
    
    // Create custom character by merging base character with user's filter preferences
    const selectedCharacter = baseCharacter ? {
        ...baseCharacter,
        // Override with user's custom name or selected preferences (if set)
        name: customName || baseCharacter.name,
        age: filters.age ? parseInt(filters.age) : baseCharacter.age,
        body: filters.body || baseCharacter.body,
        ethnicity: filters.ethnicity || baseCharacter.ethnicity,
        language: filters.language || baseCharacter.language,
        relationship: filters.relationship || baseCharacter.relationship,
        occupation: filters.occupation || baseCharacter.occupation,
        hobbies: filters.hobbies || baseCharacter.hobbies,
        personality: filters.personality || baseCharacter.personality,
        // Update description to reflect customization
        description: `${customName || baseCharacter.name} - Your customized AI companion`,
    } : undefined;

    // Debug logging
    useEffect(() => {
        if (selected && selectedCharacter) {
            console.log("Selected character with user preferences:", {
                id: selectedCharacter.id,
                name: selectedCharacter.name,
                baseAge: baseCharacter?.age,
                customAge: selectedCharacter.age,
                baseBody: baseCharacter?.body,
                customBody: selectedCharacter.body,
                baseEthnicity: baseCharacter?.ethnicity,
                customEthnicity: selectedCharacter.ethnicity,
            });
        }
    }, [selected, selectedCharacter, baseCharacter]);

    // Handle filter change
    function handleFilterChange(key: keyof typeof filters, value: string) {
        setFilters((prev) => ({ ...prev, [key]: value }));
        // Don't reset selection, just refilter
    }

    // Start chat with selected character
    function handleStartChat() {
        if (!selectedCharacter) {
            return;
        }

        if (!user) {
            // Redirect to login if not authenticated
            router.push("/login");
            return;
        }

        setCreatingChat(true);
        
        try {
            // Create a unique ID for the custom character
            const customCharacterId = `custom-${Date.now()}-${selectedCharacter.id}`;
            
            // Save the customized character to localStorage
            const customCharacterData = {
                id: customCharacterId,
                name: selectedCharacter.name,
                age: selectedCharacter.age,
                image: selectedCharacter.image,
                description: selectedCharacter.description,
                personality: selectedCharacter.personality,
                occupation: selectedCharacter.occupation,
                hobbies: selectedCharacter.hobbies,
                body: selectedCharacter.body,
                ethnicity: selectedCharacter.ethnicity,
                language: selectedCharacter.language,
                relationship: selectedCharacter.relationship,
                system_prompt: selectedCharacter.system_prompt,
                character_type: 'custom',
                is_new: true,
                created_at: new Date().toISOString(),
            };
            
            // Store in localStorage
            localStorage.setItem(`character-${customCharacterId}`, JSON.stringify(customCharacterData));
            
            console.log("Custom character created:", customCharacterData);
            
            // Navigate to chat with the custom character
            router.push(`/chat/${customCharacterId}`);
        } catch (error) {
            console.error("Error creating character:", error);
            alert("Failed to create character. Please try again.");
        } finally {
            setCreatingChat(false);
        }
    }

    return (
        <div className="max-w-xl md:max-w-5xl mx-auto mt-12 bg-[#18181f] rounded-2xl shadow-2xl p-8 text-white font-sans">
            <ProgressBar step={step} />
            {/* Step Content */}
            {step === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
                    <div className="flex justify-between items-center w-full mb-6">
                        <div className="flex-1">
                            <div className="text-3xl font-bold mb-2">Create my AI</div>
                            <div className="text-gray-400">Let's build your AI companion.</div>
                        </div>
                        <button
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {
                                if (selectedCharacter && selected) {
                                    console.log("Moving to step 2 with character:", selectedCharacter.name);
                                    setStep(1);
                                }
                            }}
                            disabled={!selectedCharacter || !selected}
                        >
                            Next &rarr;
                        </button>
                    </div>
                    {/* Filter Controls */}
                    <div className="w-full flex flex-wrap gap-2 mb-6 justify-center">
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.age} onChange={e => handleFilterChange('age', e.target.value)}>
                            <option value="">AGE</option>
                            {unique('age').map((v) => <option key={v} value={v as string}>{v}</option>)}
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.body} onChange={e => handleFilterChange('body', e.target.value)}>
                            <option value="">BODY</option>
                            {unique('body').map((v) => <option key={v} value={v as string}>{v}</option>)}
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.ethnicity} onChange={e => handleFilterChange('ethnicity', e.target.value)}>
                            <option value="">ETHNICITY</option>
                            <option value="European">European</option>
                            <option value="East Asian">East Asian</option>
                            <option value="South Asian">South Asian</option>
                            <option value="Middle Eastern">Middle Eastern</option>
                            <option value="African">African</option>
                            <option value="Latina">Latina</option>
                            <option value="Caribbean">Caribbean</option>
                            <option value="Pacific Islander">Pacific Islander</option>
                            <option value="Indigenous">Indigenous</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.language} onChange={e => handleFilterChange('language', e.target.value)}>
                            <option value="">LANGUAGE</option>
                            {unique('language').map((v) => <option key={v} value={v as string}>{v}</option>)}
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.relationship} onChange={e => handleFilterChange('relationship', e.target.value)}>
                            <option value="">RELATIONSHIP</option>
                            {unique('relationship').map((v) => <option key={v} value={v as string}>{v}</option>)}
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.occupation} onChange={e => handleFilterChange('occupation', e.target.value)}>
                            <option value="">OCCUPATION</option>
                            {unique('occupation').map((v) => <option key={v} value={v as string}>{v}</option>)}
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.hobbies} onChange={e => handleFilterChange('hobbies', e.target.value)}>
                            <option value="">HOBBIES</option>
                            {Array.from(new Set(characters.flatMap((c) => c.hobbies.split(',').map(h => h.trim())))).map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <select className="rounded bg-[#23232b] px-3 py-1 text-sm" value={filters.personality} onChange={e => handleFilterChange('personality', e.target.value)}>
                            <option value="">PERSONALITY</option>
                            {Array.from(new Set(characters.flatMap((c) => c.personality.split(',').map(p => p.trim())))).map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>
                    <div className="w-full flex flex-col items-center mb-8">
                        {loading && (
                            <div className="flex items-center gap-2 text-gray-400">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Loading characters...
                            </div>
                        )}
                        {!loading && characters.length === 0 && <div className="text-gray-500">No characters found.</div>}
                        {!loading && (
                            <>
                                <div className="w-full flex flex-wrap gap-4 justify-center mb-4">
                                    {characters.slice(0, showMore ? characters.length : 3).map((char) => {
                                        const isSelected = selected === char.id;
                                        const matchesFilter = isMatch(char);
                                        
                                        return (
                                            <div
                                                key={char.id}
                                                className={`rounded-xl p-4 flex flex-col items-center border-2 cursor-pointer transition-all duration-300 hover:scale-105
                  ${isSelected
                                                        ? "border-primary bg-accent shadow-2xl scale-110 min-w-[140px] max-w-[220px] md:min-w-[180px] md:max-w-[260px]"
                                                        : matchesFilter
                                                            ? "border-primary/50 bg-accent/50 opacity-90 min-w-[120px] max-w-[200px] md:min-w-[160px] md:max-w-[220px]"
                                                            : "border-[#23232b] bg-[#18181f] opacity-40 min-w-[120px] max-w-[200px] md:min-w-[160px] md:max-w-[220px]"
                                                    }`}
                                                onClick={() => {
                                                    console.log("Selected character:", char.id, char.name);
                                                    setSelected(char.id);
                                                }}
                                            >
                                                <img
                                                    src={char.image}
                                                    alt={char.name}
                                                    className={`rounded-full mb-2 object-cover border-2 transition-all duration-300 ${isSelected
                                                            ? "w-24 h-24 md:w-32 md:h-32 border-primary border-4"
                                                            : "w-20 h-20 md:w-24 md:h-24 border-primary"
                                                        }`}
                                                />
                                                <span className={`font-semibold mb-1 ${isSelected ? "text-xl md:text-2xl text-primary" : "text-lg"}`}>
                                                    {char.name}
                                                </span>
                                                <span className={`text-xs text-gray-400 text-center line-clamp-3 ${isSelected ? "text-sm" : ""}`}>
                                                    {char.description}
                                                </span>
                                                {isSelected && (
                                                    <div className="mt-2">
                                                        <CheckCircle className="w-6 h-6 text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {characters.length > 3 && (
                                    <button
                                        onClick={() => setShowMore(!showMore)}
                                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-semibold"
                                    >
                                        {showMore ? "Show Less" : "Show More"}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
            {selectedCharacter && step === 1 && (
                <div className="flex flex-col items-center min-h-[300px]">
                    <div className="mb-6 flex flex-col items-center">
                        <img
                            src={selectedCharacter.image}
                            alt={selectedCharacter.name}
                            className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-primary"
                        />
                        <div className="text-sm text-primary mb-2">Your AI's Core Info</div>
                        
                        {/* Custom Name Input */}
                        <div className="mb-4 w-full max-w-md">
                            <label className="block text-sm text-gray-400 mb-2">Give your AI a name</label>
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder={baseCharacter?.name || "Enter name..."}
                                className="w-full px-4 py-2 rounded-lg bg-[#23232b] border border-[#252525] text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                            />
                        </div>
                        
                        {(filters.age || filters.body || filters.ethnicity || customName) && (
                            <div className="text-xs text-green-400 flex items-center gap-1 mb-2">
                                <CheckCircle className="w-3 h-3" />
                                Customized with your preferences
                            </div>
                        )}
                    </div>
                    <div className="text-gray-400 mb-8">Step 2 of 6</div>
                    <div className="flex gap-6 mb-8 flex-wrap justify-center">
                        <Card emoji="🎂" label="AGE" value={selectedCharacter.age} />
                        <Card emoji="💪" label="BODY" value={selectedCharacter.body} />
                        <Card emoji="🌎" label="ETHNICITY" value={selectedCharacter.ethnicity} />
                    </div>
                </div>
            )}
            {selectedCharacter && step === 2 && (
                <div className="flex flex-col items-center min-h-[300px]">
                    <div className="text-2xl font-bold mb-2">How They Connect</div>
                    <div className="text-gray-400 mb-8">Step 3 of 6</div>
                    <div className="flex gap-6 mb-8">
                        <Card emoji="🗣️" label="LANGUAGE" value={selectedCharacter.language} />
                        <Card emoji="💑" label="RELATIONSHIP STATUS" value={selectedCharacter.relationship} />
                    </div>
                </div>
            )}
            {selectedCharacter && step === 3 && (
                <div className="flex flex-col items-center min-h-[300px]">
                    <div className="text-2xl font-bold mb-2">What They Do</div>
                    <div className="text-gray-400 mb-8">Step 4 of 6</div>
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-[#23232b] rounded-xl p-6 flex flex-col items-center shadow-md min-w-[220px] relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(/gaming-bg.jpg)' }} />
                            <div className="relative z-10">
                                <div className="text-3xl mb-2">💼</div>
                                <div className="text-sm text-gray-400 mb-1">OCCUPATION</div>
                                <div className="text-lg font-semibold text-white">{selectedCharacter.occupation}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {selectedCharacter && step === 4 && (
                <div className="flex flex-col items-center min-h-[300px]">
                    <div className="text-2xl font-bold mb-2">Who They Are</div>
                    <div className="text-gray-400 mb-8">Step 5 of 6</div>
                    <div className="w-full flex flex-col items-center mb-4">
                        <div className="text-sm text-gray-400 mb-2">HOBBIES</div>
                        <div className="flex flex-wrap justify-center mb-4">
                            {selectedCharacter.hobbies.split(",").map((hobby) => (
                                <Badge key={hobby.trim()} text={hobby.trim()} />
                            ))}
                        </div>
                        <div className="text-sm text-gray-400 mb-2">PERSONALITY</div>
                        <div className="flex flex-wrap justify-center">
                            {selectedCharacter.personality.split(",").map((trait) => (
                                <Badge key={trait.trim()} text={trait.trim()} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {selectedCharacter && step === 5 && (
                <div className="flex flex-col items-center min-h-[300px]">
                    <div className="text-2xl font-bold mb-2">Meet Your AI</div>
                    <div className="text-gray-400 mb-8">Step 6 of 6</div>
                    <div className="bg-[#23232b] rounded-2xl p-8 shadow-lg w-full max-w-md flex flex-col items-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${selectedCharacter.image})` }} />
                        <div className="relative z-10 flex flex-col items-center">
                            <img
                                src={selectedCharacter.image}
                                alt={selectedCharacter.name}
                                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-primary shadow-lg"
                            />
                            <div className="text-2xl font-bold mb-1">{selectedCharacter.name}</div>
                            <div className="text-xs text-gray-400 mb-2 text-center max-w-xs">{selectedCharacter.description}</div>
                            <div className="flex gap-4 mb-2">
                                <Card emoji="🎂" label="AGE" value={selectedCharacter.age} />
                                <Card emoji="💪" label="BODY" value={selectedCharacter.body} />
                                <Card emoji="🌎" label="ETHNICITY" value={selectedCharacter.ethnicity} />
                            </div>
                            <div className="flex gap-4 mb-2">
                                <Card emoji="🗣️" label="LANGUAGE" value={selectedCharacter.language} />
                                <Card emoji="💑" label="RELATIONSHIP" value={selectedCharacter.relationship} />
                                <Card emoji="💼" label="OCCUPATION" value={selectedCharacter.occupation} />
                            </div>
                            <div className="w-full flex flex-col items-center mb-2">
                                <div className="text-xs text-gray-400 mb-1">HOBBIES</div>
                                <div className="flex flex-wrap justify-center mb-2">
                                    {selectedCharacter.hobbies.split(",").map((hobby) => (
                                        <Badge key={hobby.trim()} text={hobby.trim()} />
                                    ))}
                                </div>
                                <div className="text-xs text-gray-400 mb-1">PERSONALITY</div>
                                <div className="flex flex-wrap justify-center">
                                    {selectedCharacter.personality.split(",").map((trait) => (
                                        <Badge key={trait.trim()} text={trait.trim()} />
                                    ))}
                                </div>
                            </div>
                            <button
                                className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                onClick={handleStartChat}
                                disabled={creatingChat}
                            >
                                {creatingChat ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating Chat...
                                    </>
                                ) : (
                                    "Start Chat"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#23232b] text-gray-300 hover:bg-[#252525] transition-all disabled:opacity-40"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                >
                    <ChevronLeft className="w-5 h-5" /> Previous
                </button>
                {step < 5 && (
                    <button
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold"
                        onClick={() => setStep((s) => Math.min(5, s + 1))}
                        disabled={!selectedCharacter}
                    >
                        Next <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
