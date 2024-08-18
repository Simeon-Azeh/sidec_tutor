function StepIndicator({ currentStep, totalSteps }) {
    return (
      <div className="flex justify-center mb-6">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep ? 'bg-[#9835ff] text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-12 h-1 ${
                  index + 1 < currentStep ? 'bg-[#9835ff]' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  }