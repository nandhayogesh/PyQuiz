import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Database, 
  Globe, 
  Brain,
  Loader2
} from "lucide-react";
import { Category, apiService } from "@/services/api";

interface CategoryWithUI extends Category {
  icon: React.ComponentType<any>;
  color: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  const [categories, setCategories] = useState<CategoryWithUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const apiCategories = await apiService.getCategories();
        
        // Map API categories to UI categories with icons and styling
        const uiCategories: CategoryWithUI[] = apiCategories.map(cat => {
          let icon = Code;
          let color = "text-primary";
          let difficulty: "Easy" | "Medium" | "Hard" = "Easy";
          
          switch (cat.id) {
            case 'python':
              icon = Code;
              color = "text-primary";
              difficulty = "Easy";
              break;
            case 'algorithms':
              icon = Brain;
              color = "text-secondary";
              difficulty = "Medium";
              break;
            case 'databases':
              icon = Database;
              color = "text-accent";
              difficulty = "Medium";
              break;
            case 'web':
              icon = Globe;
              color = "text-success";
              difficulty = "Easy";
              break;
            default:
              icon = Code;
              color = "text-primary";
              difficulty = "Easy";
          }
          
          return {
            ...cat,
            icon,
            color,
            difficulty,
          };
        });
        
        setCategories(uiCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success bg-success/20";
      case "Medium": return "text-warning bg-warning/20";
      case "Hard": return "text-destructive bg-destructive/20";
      default: return "text-muted bg-muted/20";
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in-scale">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Choose Your Challenge
          </h2>
          <p className="text-muted-foreground">
            Loading categories...
          </p>
        </div>
        
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in-scale">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Choose Your Challenge
          </h2>
          <p className="text-destructive">
            Error loading categories: {error}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in-scale">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Choose Your Challenge
        </h2>
        <p className="text-muted-foreground">
          Select a category to test your knowledge and level up your skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="glass-card group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-[1.02] animate-bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-secondary group-hover:shadow-neon transition-all duration-300`}>
                <category.icon className={`w-6 h-6 text-white`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category.difficulty)}`}>
                  {category.difficulty}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {category.question_count} questions
              </span>
              <Button variant="gaming" size="sm" className="group-hover:shadow-glow">
                Start Quiz
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};