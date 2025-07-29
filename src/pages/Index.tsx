import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  rating: number;
  userRating?: number;
  plays: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  user: string;
  text: string;
  rating: number;
  date: string;
}

const Index = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      title: "Midnight City",
      artist: "M83",
      genre: "Electronic",
      rating: 87,
      plays: 15420,
      comments: [
        { id: 1, user: "Алексей", text: "Невероятный трек! Атмосфера космическая", rating: 95, date: "2 дня назад" },
        { id: 2, user: "Мария", text: "Классика жанра, слушаю уже 10 лет", rating: 88, date: "1 день назад" }
      ]
    },
    {
      id: 2,
      title: "Strobe",
      artist: "Deadmau5",
      genre: "Progressive House",
      rating: 92,
      plays: 28540,
      comments: [
        { id: 3, user: "Дмитрий", text: "Эпическое нарастание, мурашки гарантированы", rating: 98, date: "3 часа назад" }
      ]
    },
    {
      id: 3,
      title: "Teardrop",
      artist: "Massive Attack",
      genre: "Trip Hop",
      rating: 94,
      plays: 19870,
      comments: []
    },
    {
      id: 4,
      title: "Porcelain",
      artist: "Moby",
      genre: "Ambient",
      rating: 89,
      plays: 12340,
      comments: [
        { id: 4, user: "Елена", text: "Меланхоличная красота", rating: 91, date: "5 часов назад" }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [commentRating, setCommentRating] = useState([85]);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  const addComment = (trackId: number) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: "Вы",
      text: newComment,
      rating: commentRating[0],
      date: "Только что"
    };

    setTracks(tracks.map(track => 
      track.id === trackId 
        ? { ...track, comments: [...track.comments, comment] }
        : track
    ));
    
    setNewComment('');
    setCommentRating([85]);
    setSelectedTrack(null);
  };

  const updateTrackRating = (trackId: number, rating: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId 
        ? { ...track, userRating: rating }
        : track
    ));
  };

  const userStats = {
    totalRatings: 47,
    avgRating: 86.3,
    totalPlays: 2340,
    favoriteGenre: "Electronic"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Music" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">MusicRate</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Icon name="User" size={16} className="mr-2" />
                Личный профиль
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Music Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Sparkles" size={24} className="mr-2 text-primary" />
                Новая музыка
              </h2>
              
              <div className="space-y-4">
                {tracks.map((track) => (
                  <Card key={track.id} className="animate-fade-in hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{track.title}</CardTitle>
                          <p className="text-muted-foreground mt-1">{track.artist}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <Badge variant="outline">{track.genre}</Badge>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Icon name="Play" size={14} />
                              <span>{track.plays.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">{track.rating}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                          {track.userRating && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Ваша оценка: {track.userRating}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Rating Slider */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium">Ваша оценка</label>
                          <span className="text-sm text-primary font-semibold">{track.userRating || 0}/100</span>
                        </div>
                        <Slider
                          value={[track.userRating || 0]}
                          onValueChange={(value) => updateTrackRating(track.id, value[0])}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Comments Section */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center">
                            <Icon name="MessageCircle" size={16} className="mr-2" />
                            Комментарии ({track.comments.length})
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                          >
                            <Icon name="Plus" size={14} className="mr-1" />
                            Добавить
                          </Button>
                        </div>

                        {/* Add Comment Form */}
                        {selectedTrack === track.id && (
                          <div className="space-y-3 p-4 bg-muted/50 rounded-lg mb-4 animate-scale-in">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Ваша оценка: {commentRating[0]}/100</label>
                              <Slider
                                value={commentRating}
                                onValueChange={setCommentRating}
                                max={100}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            <Textarea
                              placeholder="Поделитесь впечатлениями о треке..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <div className="flex space-x-2">
                              <Button onClick={() => addComment(track.id)} size="sm">
                                Отправить
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => setSelectedTrack(null)}>
                                Отмена
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-3">
                          {track.comments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-muted/30 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">{comment.user}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {comment.rating}/100
                                  </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="text-sm text-foreground">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2" />
                  Ваша статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Оценок дано</span>
                    <span className="font-semibold">{userStats.totalRatings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Средняя оценка</span>
                    <span className="font-semibold text-primary">{userStats.avgRating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Прослушиваний</span>
                    <span className="font-semibold">{userStats.totalPlays.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Любимый жанр</span>
                    <Badge variant="secondary">{userStats.favoriteGenre}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Rated */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Trophy" size={20} className="mr-2" />
                  Топ треков
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tracks
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((track, index) => (
                      <div key={track.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{track.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {track.rating}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Genres */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Tag" size={20} className="mr-2" />
                  Жанры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(tracks.map(t => t.genre))).map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Activity" size={20} className="mr-2" />
                  Активность за неделю
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
                    const value = Math.floor(Math.random() * 100);
                    return (
                      <div key={day} className="flex items-center space-x-3">
                        <span className="text-xs w-6 text-muted-foreground">{day}</span>
                        <Progress value={value} className="flex-1" />
                        <span className="text-xs w-8 text-right text-muted-foreground">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;