"use client"

const INTERESTS = [
  "Music",
  "Movies",
  "Sports",
  "Tech",
  "Gaming",
  "Reading",
  "Fitness",
  "Photography",
  "Travel",
  "Cooking",
  "Art",
  "Fashion",
]

export default function InterestsSection({
  selectedInterests,
  setSelectedInterests,
}: {
  selectedInterests: string[]
  setSelectedInterests: (interests: string[]) => void
}) {
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Choose your interests</h2>
      <div className="flex flex-wrap gap-3">
        {INTERESTS.map((interest) => {
          const isSelected = selectedInterests.includes(interest)
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {interest}
            </button>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        Selected: {selectedInterests.length > 0 ? selectedInterests.join(", ") : "None"}
      </p>
    </div>
  )
}
