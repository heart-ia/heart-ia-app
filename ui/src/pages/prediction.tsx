import { useState, useEffect } from 'react';
import { usePredictionForm } from '@/hooks/use-prediction-form';
import { useAdvancedPredictionForm } from '@/hooks/use-advanced-prediction-form';
import { PredictionForm } from '@/components/prediction/prediction-form';
import { AdvancedPredictionForm } from '@/components/prediction/advanced-prediction-form';
import { PredictionResults } from '@/components/prediction/prediction-results';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Menu, X, UserCircle, Code } from 'lucide-react';

/**
 * Page component for cardiovascular disease prediction
 * This component has been refactored to follow SOLID principles
 */
export function PredictionPage() {
  // Use the custom hooks to manage form state and logic
  const {
    form: userForm,
    realtimeMode: userRealtimeMode,
    setRealtimeMode: setUserRealtimeMode,
    error: userError,
    result: userResult,
    isLoading: userIsLoading,
    onSubmit: userOnSubmit,
    resetForm: userResetForm,
  } = usePredictionForm();

  const {
    form: advancedForm,
    realtimeMode: advancedRealtimeMode,
    setRealtimeMode: setAdvancedRealtimeMode,
    error: advancedError,
    result: advancedResult,
    isLoading: advancedIsLoading,
    onSubmit: advancedOnSubmit,
    resetForm: advancedResetForm,
  } = useAdvancedPredictionForm();

  // State to track the active tab
  const [activeTab, setActiveTab] = useState('user-friendly');

  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  // State to control drawer open state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Determine which result and error to use based on the active tab
  const result = activeTab === 'user-friendly' ? userResult : advancedResult;
  const error = activeTab === 'user-friendly' ? userError : advancedError;
  const realtimeMode = activeTab === 'user-friendly' ? userRealtimeMode : advancedRealtimeMode;

  // Check if we're on mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
        Prédiction de Maladie Cardiovasculaire
      </h1>

      {isMobile && (
        <div className="mb-4 flex justify-center">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="default"
                className="flex w-full items-center gap-2 sm:w-auto"
              >
                <Menu className="h-4 w-4" />
                Remplir le formulaire
              </Button>
            </DrawerTrigger>
            <DrawerContent
              className={`rounded-t-xl border-t-0 ${
                realtimeMode ? 'bg-background/0' : ''
              }`}
            >
              <div className="absolute top-4 right-4 z-10">
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
              <div className="flex h-full flex-col overflow-auto px-4">
                <h3 className="mb-4 text-center text-lg font-semibold">
                  Formulaire de prédiction
                </h3>
                <Tabs defaultValue="user-friendly" onValueChange={setActiveTab} value={activeTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="user-friendly" className="flex items-center gap-1">
                      <UserCircle className="h-4 w-4" />
                      <span className="hidden sm:inline">Mode</span> Simplifié
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      <span className="hidden sm:inline">Mode</span> Avancé
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="user-friendly">
                    <PredictionForm
                      form={userForm}
                      onSubmit={userOnSubmit}
                      resetForm={userResetForm}
                      isLoading={userIsLoading}
                      realtimeMode={userRealtimeMode}
                      setRealtimeMode={setUserRealtimeMode}
                      onFormSubmit={() => setIsDrawerOpen(false)}
                    />
                  </TabsContent>
                  <TabsContent value="advanced">
                    <AdvancedPredictionForm
                      form={advancedForm}
                      onSubmit={advancedOnSubmit}
                      resetForm={advancedResetForm}
                      isLoading={advancedIsLoading}
                      realtimeMode={advancedRealtimeMode}
                      setRealtimeMode={setAdvancedRealtimeMode}
                      onFormSubmit={() => setIsDrawerOpen(false)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Form component - only visible on desktop */}
        {!isMobile && (
          <Tabs defaultValue="user-friendly" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user-friendly" className="flex items-center gap-1">
                <UserCircle className="h-4 w-4" />
                Mode Simplifié
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Mode Avancé
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user-friendly">
              <PredictionForm
                form={userForm}
                onSubmit={userOnSubmit}
                resetForm={userResetForm}
                isLoading={userIsLoading}
                realtimeMode={userRealtimeMode}
                setRealtimeMode={setUserRealtimeMode}
              />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedPredictionForm
                form={advancedForm}
                onSubmit={advancedOnSubmit}
                resetForm={advancedResetForm}
                isLoading={advancedIsLoading}
                realtimeMode={advancedRealtimeMode}
                setRealtimeMode={setAdvancedRealtimeMode}
              />
            </TabsContent>
          </Tabs>
        )}

        {/* Results component - full width on mobile */}
        <div className={isMobile ? 'col-span-1' : ''}>
          <PredictionResults
            result={result}
            error={error}
            isRealtime={realtimeMode}
          />
        </div>
      </div>
    </div>
  );
}
