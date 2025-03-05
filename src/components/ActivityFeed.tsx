'use client';

import { Activity, ActivityType } from '@/lib/types/activity';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  showFilters?: boolean;
  isUnauthorized?: boolean;
}

const getActivityIcon = (type: ActivityType): { icon: string; color: string } => {
  const types = {
    // Lead Activities
    lead_created: { icon: '👥', color: 'bg-blue-100' },
    lead_updated: { icon: '📝', color: 'bg-blue-50' },
    lead_status_changed: { icon: '🔄', color: 'bg-blue-100' },
    lead_assigned: { icon: '👤', color: 'bg-blue-50' },
    lead_converted: { icon: '🎯', color: 'bg-green-100' },
    lead_lost: { icon: '❌', color: 'bg-red-100' },
    
    // Proposal Activities
    proposal_created: { icon: '📄', color: 'bg-purple-50' },
    proposal_sent: { icon: '📨', color: 'bg-purple-100' },
    proposal_viewed: { icon: '👁️', color: 'bg-purple-50' },
    proposal_accepted: { icon: '✅', color: 'bg-green-100' },
    proposal_rejected: { icon: '❌', color: 'bg-red-100' },
    proposal_revised: { icon: '📝', color: 'bg-purple-50' },
    
    // Project Activities
    project_created: { icon: '🚀', color: 'bg-indigo-50' },
    project_started: { icon: '▶️', color: 'bg-indigo-100' },
    project_milestone: { icon: '🏁', color: 'bg-indigo-50' },
    project_completed: { icon: '🎉', color: 'bg-green-100' },
    project_delayed: { icon: '⚠️', color: 'bg-yellow-100' },
    
    // Task Activities
    task_created: { icon: '📋', color: 'bg-gray-50' },
    task_assigned: { icon: '👤', color: 'bg-gray-100' },
    task_status_changed: { icon: '🔄', color: 'bg-gray-50' },
    task_completed: { icon: '✅', color: 'bg-green-100' },
    task_overdue: { icon: '⏰', color: 'bg-red-100' },
    
    // Document Activities
    document_uploaded: { icon: '📎', color: 'bg-orange-50' },
    document_updated: { icon: '📝', color: 'bg-orange-100' },
    document_shared: { icon: '🔗', color: 'bg-orange-50' },
    document_signed: { icon: '✍️', color: 'bg-green-100' },
    
    // Communication Activities
    email_sent: { icon: '📧', color: 'bg-teal-50' },
    call_logged: { icon: '📞', color: 'bg-teal-100' },
    meeting_scheduled: { icon: '📅', color: 'bg-teal-50' },
    note_added: { icon: '📝', color: 'bg-gray-50' }
  };

  return types[type] || { icon: '📝', color: 'bg-gray-50' };
};

const getImportanceBadge = (importance: string = 'medium') => {
  const styles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  
  return styles[importance as keyof typeof styles] || styles.medium;
};

export function ActivityFeed({ 
  activities, 
  loading, 
  onLoadMore, 
  hasMore, 
  showFilters = false,
  isUnauthorized = false 
}: ActivityFeedProps) {
  const [isIntersecting, setIntersecting] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<Set<ActivityType>>(new Set());
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (selectedTypes.size === 0) {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(
        activities.filter(activity => selectedTypes.has(activity.type as ActivityType))
      );
    }
  }, [activities, selectedTypes]);

  useEffect(() => {
    // Clean up previous observer
    if (observer) {
      observer.disconnect();
    }

    // Only create new observer if we can load more and aren't unauthorized
    if (hasMore && !loading && onLoadMore && !isUnauthorized) {
      const newObserver = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0.5 }
      );
      setObserver(newObserver);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore, isUnauthorized]);

  useEffect(() => {
    if (isIntersecting && hasMore && !loading && onLoadMore && !isUnauthorized) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore, isUnauthorized]);

  const renderMetadata = (activity: Activity) => {
    if (!activity.metadata) return null;
    
    const metadata = activity.metadata;
    switch (activity.type) {
      case 'lead_status_changed':
        return (
          <div className="text-sm text-gray-500 mt-1">
            <span className="line-through">{metadata.previousStatus}</span>
            {' → '}
            <span className="font-medium">{metadata.newStatus}</span>
          </div>
        );
      case 'lead_converted':
        return (
          <div className="text-sm text-gray-500 mt-1">
            Deal value: ${metadata.conversionDetails?.dealValue?.toLocaleString()}
          </div>
        );
      case 'project_milestone':
        return (
          <div className="text-sm text-gray-500 mt-1">
            {metadata.milestoneTitle} - {metadata.completionPercentage}% complete
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from(new Set(activities.map(a => a.type))).map(type => (
            <Badge
              key={type}
              variant="outline"
              className={`cursor-pointer ${
                selectedTypes.has(type as ActivityType) ? 'bg-blue-100' : ''
              }`}
              onClick={() => {
                const newTypes = new Set(selectedTypes);
                if (newTypes.has(type as ActivityType)) {
                  newTypes.delete(type as ActivityType);
                } else {
                  newTypes.add(type as ActivityType);
                }
                setSelectedTypes(newTypes);
              }}
            >
              {getActivityIcon(type as ActivityType).icon} {type.replace(/_/g, ' ')}
            </Badge>
          ))}
        </div>
      )}

      {filteredActivities.map((activity) => {
        const { icon, color } = getActivityIcon(activity.type as ActivityType);
        return (
          <Card key={activity.id} className={`p-4 ${activity.isSystem ? 'bg-gray-50' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Avatar className={color}>
                  <AvatarFallback>{icon}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.userName}
                  </p>
                  <Badge variant="outline" className={getImportanceBadge(activity.importance)}>
                    {activity.importance}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{activity.description}</p>
                {renderMetadata(activity)}
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
      
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}

      {isUnauthorized && (
        <div className="text-center p-4 text-gray-500">
          Please sign in to view activities
        </div>
      )}
      
      {hasMore && !loading && !isUnauthorized && (
        <div
          ref={(el) => {
            if (el && observer) {
              observer.observe(el);
            }
          }}
          className="h-4"
        />
      )}
    </div>
  );
} 